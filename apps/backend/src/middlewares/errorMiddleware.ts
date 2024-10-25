import { Request, Response, NextFunction } from "express";

export const errorHandlerMiddleware = (
  err: any,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;

  const errorResponse = {
    data: null,
    code: statusCode,
    message: process.env.ENV === "PROD" ? "Something went wrong" : err.message,
  };

  res.status(500).json(errorResponse);
};
