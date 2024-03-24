import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const accessToken = get(req, "headers.authorization", "").replace(
		/^Bearer\s/,
		""
	);

	// Extract x-refresh header
  const refreshHeaderValue = get(req.headers, "x-refresh");

	const refreshToken: string | undefined = Array.isArray(refreshHeaderValue)
	? refreshHeaderValue[0] // Use the first value if it's an array
	: typeof refreshHeaderValue === "string"
	? refreshHeaderValue // Use the value if it's a string
	: undefined; // Otherwise, set to undefined

	if (!accessToken) {
		return next();
	}

	const { decoded, expired } = verifyJwt(accessToken);
	if (decoded) {
		res.locals.user = decoded;
		return next();
	}

	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken({ refreshToken });
		if (newAccessToken) {
			res.setHeader("x-access-token", newAccessToken);
		}
		const result = verifyJwt(newAccessToken as string);

		res.locals.user = result.decoded;
		return next();
	}
	return next();
};

export default deserializeUser;
