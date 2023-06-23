import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
// import  ENUM_USER_ROLE  from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;
router.post(
  '/create-faculty',
  auth(SUPER_ADMIN, ADMIN),
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

router.get(
  '/',
  auth(SUPER_ADMIN, ADMIN, FACULTY),
  AcademicFacultyController.getAllFaculties
);
router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicFacultyController.getSingleFaculty
);
router.delete(
  '/:id',
  auth(SUPER_ADMIN, ADMIN),
  AcademicFacultyController.deleteFaculty
);
router.patch(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY),
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
);

export const AcademicFacultyRoutes = router;
