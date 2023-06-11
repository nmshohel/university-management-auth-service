import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterTitles,
  academicsemisterMonths,
} from './academicSemister.constrant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required ',
    }),
    code: z.enum([...academicSemisterCodes] as [string, ...string[]]),
    startMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
      required_error: 'Start month is needed',
    }),
    endMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
      required_error: 'End month is needed',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitles] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required ',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCodes] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...academicsemisterMonths] as [string, ...string[]], {
          required_error: 'Start month is needed',
        })
        .optional(),
      endMonth: z
        .enum([...academicsemisterMonths] as [string, ...string[]], {
          required_error: 'End month is needed',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};
