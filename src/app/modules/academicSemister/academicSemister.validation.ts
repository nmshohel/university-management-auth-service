// import { z } from 'zod';
// import {
//   academicSemisterCodes,
//   academicSemisterTitles,
//   academicsemisterMonths,
// } from './academicSemister.constrant';
// const createAcademicSemisterZodSchema = z.object({
//   body: z.object({
//     title: z.enum([...academicSemisterTitles] as [string, ...string[]], {
//       required_error: 'Title is required',
//     }),
//     year: z.number({ required_error: 'Year is required' }),
//     code: z.enum([...academicSemisterCodes] as [string, ...string[]], {
//       required_error: 'Code is required',
//     }),
//     startMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
//       required_error: 'Start month is required',
//     }),
//     endMonth: z.enum([...academicsemisterMonths] as [string, ...string[]], {
//       required_error: 'End month is required',
//     }),
//   }),
// });

// export const AcademicSemisterValidation = {
//   createAcademicSemisterZodSchema,
// };

import { z } from 'zod';
import {
  academicSemisterCodes,
  academicSemisterTitles,
  academicsemisterMonths,
} from './academicSemister.constrant';
// import {
//   academicSemesterCodes,
//   academicSemesterTitles,
//   acdemicSemesterMonths,
// } from './academicSemister.constrant';

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

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
