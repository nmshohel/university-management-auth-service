import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// check exist faculty in DB
academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'AcademicFaculty is already exist.'
    );
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
