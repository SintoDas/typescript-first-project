import { NextFunction, Request, Response } from 'express';

export const globalErrorhandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = 'something went wrong';
  return res.status(statusCode).json({
    success: false,
    message: error.message || message,
  });
};
