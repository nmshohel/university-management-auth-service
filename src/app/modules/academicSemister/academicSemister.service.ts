import ApiError from '../../../errors/ApiError';
import { AcademicSemister } from './academicSemister.Model';
import { AcademicMesisterTitleCodeMapper } from './academicSemister.constrant';
import { IAcademicSemister } from './academicSemister.interface';
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

export const AcademicSemisterService = {
  createSemiter,
};
