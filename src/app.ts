import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

import httpStatus from 'http-status';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/', routes);

// console.log(app.get('env'))

// global error handler
app.use(globalErrorHandler);

// handle not found Api
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not Found',
      },
    ],
  });
  next();
});

// const testId = async () => {
//   const testId = await generateFacultyId();
//   console.log(testId);
// };
// testId();

export default app;
