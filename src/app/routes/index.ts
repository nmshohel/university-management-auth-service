import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
];

moduleRoute.forEach(route => router.use(route.path, route.route));
// router.use('/users/', UserRoutes);
// router.use('/academic-semisters', AcademicSemisterRoutes);

export default router;
