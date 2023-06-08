/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { Error } from 'mongoose';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handleValidationError';

import { ZodError } from 'zod';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorLogger } from '../../shared/logger';
// import { errorlogger } from '../../shared/logger';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  config.env === 'development'
    ? console.log(`🐱‍🏍 globalErrorHandler ~~`, error)
    : errorLogger.error(`🐱‍🏍 globalErrorHandler ~~`, error);

  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  });

  next();
};

export default globalErrorHandler;

//path:
//message:

// 2025 Fall

// 2025 and

// /* eslint-disable no-unused-expressions */
// /* eslint-disable no-console */
// import { ErrorRequestHandler } from 'express';
// import config from '../../config';
// import { IGenericErrorMessage } from '../../interfaces/error';
// import handleValidationError from '../../errors/handleValidationError';
// import ApiError from '../../errors/ApiError';
// import { errorLogger } from '../../shared/logger';
// import { ZodError } from 'zod';
// import handleZodError from '../../errors/handleZodError';

// const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
//   config.env == 'development'
//     ? console.log('global error handler:', error)
//     : errorLogger.error('global error handler', error);

//   let statusCode = 500;
//   let message = 'Something went wrong';
//   let errorMessages: IGenericErrorMessage[] = [];

//   if (error?.name === 'ValidatorError') {
//     const simpliedError = handleValidationError(error);
//     statusCode = simpliedError.statusCode;
//     message = simpliedError.message;
//     errorMessages = simpliedError.errorMessages;
//   } else if (error instanceof Error) {
//     message = error?.message;
//     errorMessages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message,
//           },
//         ]
//       : [];
//   } else if (error instanceof ZodError) {
//     const simpliedError = handleZodError(error);
//     statusCode = simpliedError.statusCode;
//     message = simpliedError.message;
//     errorMessages = simpliedError.errorMessages;
//   } else if (error instanceof ApiError) {
//     statusCode = error?.statusCode;
//     message = error.message;
//     errorMessages = error?.message
//       ? [
//           {
//             path: '',
//             message: error?.message,
//           },
//         ]
//       : [];
//   }

//   res.status(statusCode).json({
//     success: false,
//     message,
//     errorMessages,
//     stack: config.env !== 'production' ? error.stack : undefined,
//   });
//   next();
// };
// export default globalErrorHandler;
