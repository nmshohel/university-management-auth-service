import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
// import { AcademicSemisterValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controller';
import { AcademicSemesterValidation } from './academicSemister.validation';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemisterController.createSemister
);

router.get('/:id', AcademicSemisterController.getSingleSemister);
router.get('/', AcademicSemisterController.getAllSemisters);

export const AcademicSemisterRoutes = router;
