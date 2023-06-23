import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();
const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;
router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  auth(SUPER_ADMIN, ADMIN, FACULTY),
  ManagementDepartmentController.createDepartment
);

router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  ManagementDepartmentController.getSingleDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  ManagementDepartmentController.updateDepartment
);

router.delete(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  ManagementDepartmentController.deleteDepartment
);

router.get(
  '/',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  ManagementDepartmentController.getAllDepartments
);

export const ManagementDepartmentRoutes = router;
