export type ILoginUser = {
  id: string;
  password: string;
};

export type IUserLoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChage: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
