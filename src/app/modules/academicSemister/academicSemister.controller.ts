import { NextFunction, Request, Response } from 'express';
// import { UserService } from './user.service';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
// import { z } from 'zod'

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemiserData } = req.body;
    const result = await AcademicSemisterService.createSemiter(
      academicSemiserData
    );
    next();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semister created Successfull',
      data: result,
    });
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semister is created Successfully',
    //   data: result,
    // });
  }
);

export const AcademicSemisterController = {
  createSemister,
};
