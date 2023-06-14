import { Request, Response } from 'express';
// import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFileds } from '../../../constants/pagination';

import { studentFilterableFields } from './student.constrant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';
// import { z } from 'zod'

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic student retrieved Successfull',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic student deleted Successfull',
    data: result,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationFileds);
  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic student retrieved Successfull',
    meta: result.meta,
    data: result.data,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academi student Updated Successfull',
    data: result,
  });
});
export const StudentController = {
  updateStudent,
  getAllStudents,
  deleteStudent,
  getSingleStudent,
};
