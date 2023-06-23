import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { AcademicSemisterValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemesterValidation } from './academicSemister.validation';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
const { SUPER_ADMIN, ADMIN, FACULTY, STUDENT } = ENUM_USER_ROLE;
router.post(
  '/create-semister',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicSemisterController.createSemister
);

router.get(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicSemisterController.getSingleSemister
);
router.delete(
  '/:id',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicSemisterController.deleteSemister
);
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicSemisterController.updateSemister
);
router.get(
  '/',
  auth(SUPER_ADMIN, ADMIN, FACULTY, STUDENT),
  AcademicSemisterController.getAllSemisters
);

export const AcademicSemisterRoutes = router;
