import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import {
  IAcademicSemister,
  IAcademicSemisterModel,
} from './academicSemister.interface';
import {
  academicSemisterCodes,
  academicSemisterTitles,
  academicsemisterMonths,
} from './academicSemister.constrant';
import ApiError from '../../../errors/ApiError';
const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitles,
    },
    year: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCodes,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicsemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicsemisterMonths,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// check semister
academicSemisterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Semister is already exist.');
  }
  next();
});

export const AcademicSemister = model<
  IAcademicSemister,
  IAcademicSemisterModel
>('AcademicSemister', academicSemisterSchema);
