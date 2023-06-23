import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
// import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();
const { SUPER_ADMIN, ADMIN } = ENUM_USER_ROLE;
router.post(
  '/create-student',
  // auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  auth(SUPER_ADMIN, ADMIN),
  UserController.createStudent
);
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  auth(SUPER_ADMIN, ADMIN),
  UserController.createFaculty
);
router.post(
  '/create-admin',
  validateRequest(UserValidation.createAdminZodSchema),
  auth(SUPER_ADMIN),
  UserController.createAdmin
);
export const UserRoutes = router;

// user.validation.ts
