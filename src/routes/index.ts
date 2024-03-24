import { Express, Request, Response } from "express";
import logger from "../utils/logger";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middlerware/validateResource";
import { createUserSchema } from "../schema/user.schema";
import logReq from "../middlerware/logReqInit";
import {
	createUserSessionHandler,
	getUserSessionsHandler,
	deleteSessionHandler,
} from "../controller/session.controller";
import { createSessionSchema } from "../schema/session.schema";
import requireUser from "../middlerware/requireUser";
import {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	deleteProductSchema,
} from "../schema/product.schema";
import {
	createProductHandler,
	updateProductHandler,
	getProductHandler,
	deleteProductHandler,
} from "../controller/product.controller";

function routes(app: Express) {
	app.get("/health", (req: Request, res: Response) => {
		logger.info("healthCheck API invoked");
		res.sendStatus(200);
	});

	// invoking validateResource as middleware for validation of request.
	app.post(
		"/api/user",
		logReq,
		validateResource(createUserSchema),
		createUserHandler
	);

	app.post(
		"/api/session",
		logReq,
		validateResource(createSessionSchema),
		createUserSessionHandler
	);
	app.get("/api/session", requireUser, getUserSessionsHandler);
	app.delete("/api/session", requireUser, deleteSessionHandler);

	// Product
	app.post(
		"/api/product",
		requireUser,
		validateResource(createProductSchema),
		createProductHandler
	);

	app.put(
		"/api/product/:productId",
		[requireUser, validateResource(updateProductSchema)],
		updateProductHandler
	);

	app.get(
		"/api/product/:productId",
		validateResource(getProductSchema),
		getProductHandler
	);

	app.delete(
		"/api/product/:productId",
		[requireUser, validateResource(deleteProductSchema)],
		deleteProductHandler
	);
}

export default routes;
