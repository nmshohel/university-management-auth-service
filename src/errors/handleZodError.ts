import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorRespose } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorRespose => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};
export default handleZodError;
