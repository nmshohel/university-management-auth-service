import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
// import { AcademicDepartmentValidation } from './academicDepartment.validations';

const router = express.Router();
const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;
router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicDepartmentController.createDepartment
);

router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicDepartmentController.getSingleDepartment
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicDepartmentController.updateDepartment
);

router.delete(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicDepartmentController.deleteDepartment
);

router.get(
  '/',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicDepartmentController.getAllDepartments
);

export const AcademicDepartmentRoutes = router;
