export type LoginInput = {
  data: { email: string; password: string };
};

export type LoginResponse = {
  login: { token: string; isCompany: boolean };
};
