import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterTitles,
  academicsemisterMonths,
} from './academicSemister.constrant';
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({ required_error: 'Year is required' }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemisterValidation = {
  createAcademicSemisterZodSchema,
};
