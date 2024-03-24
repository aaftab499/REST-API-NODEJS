import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

const logReq = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`Request received for route: ${req.originalUrl}`)
  next();
}

export default logReq;