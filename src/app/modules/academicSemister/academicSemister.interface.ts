import { Model } from 'mongoose';
export type IAcademicSemisterMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemisterTitles = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemisterCodes = '01' | '02' | '03';
export type IAcademicSemister = {
  title: IAcademicSemisterTitles;
  year: string;
  code: IAcademicSemisterCodes;
  startMonth: IAcademicSemisterMonth;
  endMonth: IAcademicSemisterMonth;
};

export type IAcademicSemisterModel = Model<IAcademicSemister>;

export type IAcademicSemisterFilters = {
  searchTerm?: string;
};
