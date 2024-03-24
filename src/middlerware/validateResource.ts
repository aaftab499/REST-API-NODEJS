import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
// Usage of currying
// calling validate func with schema, which returns another route func having req, res
const validate =
	(schema: AnyZodObject) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (e: any) {
			return res.status(400).send(e.errors);
		}
	};

export default validate;
