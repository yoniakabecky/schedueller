export type LoginInput = {
  data: { email: string; password: string };
};

export type LoginResponse = {
  login: { token: string; isCompany: boolean };
};

export type SignupInput = {
  data: {
    email: string;
    password: string;
    confirmPassword: string;
    isCompany: boolean;
    displayName: string;
  };
};

export type SignupResponse = {
  signup: { token: string; isCompany: boolean };
};
