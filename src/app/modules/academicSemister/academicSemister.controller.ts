import { NextFunction, Request, Response } from 'express';
// import { UserService } from './user.service';
import { AcademicSemisterService } from './academicSemister.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFileds } from '../../../constants/pagination';
import { IAcademicSemister } from './academicSemister.interface';
// import { z } from 'zod'

const createSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemiserData } = req.body;
    const result = await AcademicSemisterService.createSemiter(
      academicSemiserData
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semister created Successfull',
      data: result,
    });
    next();
  }
);

const getSingleSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await AcademicSemisterService.getSingleSemister(id);

    sendResponse<IAcademicSemister>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semister retrieved Successfull',
      data: result,
    });
    next();
  }
);

const getAllSemisters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm']);
    const paginationOptions = pick(req.query, paginationFileds);
    const result = await AcademicSemisterService.getAllSemisters(
      filters,
      paginationOptions
    );

    sendResponse<IAcademicSemister[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semister retrieved Successfull',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createSemister,
  getAllSemisters,
  getSingleSemister,
};
