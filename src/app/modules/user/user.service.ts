import mongoose from 'mongoose';
import config from '../../../config/index';
import ApiError from '../../../errors/ApiError';
import { AcademicSemister } from '../academicSemister/academicSemister.Model';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }
  //  set role
  user.role = 'student';
  const academicSemister = await AcademicSemister.findById(
    student.academicSemister
  );

  // generate student id
  let newUserAllData = null;
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const id = await generateStudentId(academicSemister);
    user.id = id;
    student.id = id;
    // newStudent is array
    const newStudent = await Student.create([student], { session }); //Student--is model
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create student');
    }

    // set student --_id is user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create User');
    }
    newUserAllData = newUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemister',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }
  return newUserAllData;
};

export const UserService = {
  createStudent,
};
