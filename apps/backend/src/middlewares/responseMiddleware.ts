import { Request, Response, NextFunction } from "express";
import { Email } from "../models/emailModel";

interface SuccessResponseBody {
  data?: Email;
}

export const successResponseMiddleware = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  const originalJson = res.json;

  res.json = function (body: SuccessResponseBody): Response {
    const formattedResponse = {
      data: body,
      code: 200,
      message: "Success",
    };

    return originalJson.call(this, formattedResponse);
  };

  next();
};
