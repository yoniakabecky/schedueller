import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($data: LoginInput!) {
    login(data: $data) {
      token
      isCompany
    }
  }
`;

export const SIGNUP = gql`
  mutation signup($data: SignupInput!) {
    signup(data: $data) {
      token
      isCompany
    }
  }
`;
