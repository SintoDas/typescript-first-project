import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;
    const result = await userServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const userControllers = {
  createStudent,
};
