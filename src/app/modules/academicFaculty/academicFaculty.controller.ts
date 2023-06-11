import { Response, Request } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyService } from './academicFaculty.service';
import sendReponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { paginationFileds } from '../../../constants/pagination';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;
  const result = await AcademicFacultyService.createFaculty(
    academicFacultyData
  );

  sendReponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty created Successfull',
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved Successfull',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Deleteed Successfully',
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['searchTerm']);
  const paginationOptions = pick(req.query, paginationFileds);
  const result = await AcademicFacultyService.getAllFaculties(
    filters,
    paginationOptions
  );

  sendReponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty retrieved Successfull',
    meta: result.meta,
    data: result.data,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateSemister(id, updatedData);

  sendReponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Faculty Updated Successfull',
    data: result,
  });
});
export const AcademicFacultyController = {
  createFaculty,
  getSingleFaculty,
  deleteFaculty,
  getAllFaculties,
  updateFaculty,
};
