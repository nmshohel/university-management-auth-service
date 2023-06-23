import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { FacultyValidaion } from './faculty.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();
const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;
router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  FacultyController.getSingleFaculty
);
router.get(
  '/',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  FacultyController.getAllFaculties
);
router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  FacultyController.deleteFaculty
);
router.patch(
  '/:id',
  validateRequest(FacultyValidaion.updateFacultyZodSchema),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  FacultyController.updateFaculty
);
export const FacultyRoutes = router;

// user.validation.ts
