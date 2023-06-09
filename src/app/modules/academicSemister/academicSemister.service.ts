import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AcademicSemister } from './academicSemister.Model';
import { AcademicMesisterTitleCodeMapper } from './academicSemister.constrant';
import {
  IAcademicSemister,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import httpStatus from 'http-status';
const createSemiter = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  // match title and code
  if (AcademicMesisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong Semister Code');
  }

  const result = await AcademicSemister.create(payload);
  return result;
};

// get single semister service
const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const getAllSemisters = async (
  filters: IAcademicSemisterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const academicSemisterSearchableFiled = ['title', 'code', 'year'];
  const { searchTerm } = filters;
  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: academicSemisterSearchableFiled.map(filed => ({
        [filed]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePaginations(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicSemister.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemisterService = {
  createSemiter,
  getAllSemisters,
  getSingleSemister,
};
