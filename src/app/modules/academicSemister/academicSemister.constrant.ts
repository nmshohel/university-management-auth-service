import {
  IAcademicSemisterCodes,
  IAcademicSemisterMonth,
  IAcademicSemisterTitles,
} from './academicSemister.interface';

export const academicsemisterMonths: IAcademicSemisterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitles: IAcademicSemisterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemisterCodes: IAcademicSemisterCodes[] = [
  '01',
  '02',
  '03',
];

export const AcademicMesisterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summber: '02',
  Fall: '03',
};
