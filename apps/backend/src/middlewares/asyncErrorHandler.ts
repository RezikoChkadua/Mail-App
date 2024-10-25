import { Request, Response, NextFunction } from "express";

export const asyncErrorHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any> | void
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
