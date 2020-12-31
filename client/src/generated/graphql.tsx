import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  accounts: Array<Account>;
  getAccount: Account;
  companies: Array<Company>;
  getCompany: Company;
  employees: Array<Employee>;
  getMyEmployments: Array<Employee>;
  getOurEmployees: Array<Employee>;
  positions: Array<Position>;
  getOurPositions: Array<Position>;
  sections: Array<Section>;
  getOurSections: Array<Section>;
  shifts: Array<Shift>;
  users: Array<User>;
  getUser: User;
};


export type QueryGetAccountArgs = {
  accountId: Scalars['String'];
};


export type QueryGetCompanyArgs = {
  accountId: Scalars['String'];
};


export type QueryGetMyEmploymentsArgs = {
  userId: Scalars['String'];
};


export type QueryGetOurEmployeesArgs = {
  companyId: Scalars['String'];
};


export type QueryGetOurPositionsArgs = {
  companyId: Scalars['String'];
};


export type QueryGetOurSectionsArgs = {
  companyId: Scalars['String'];
};


export type QueryGetUserArgs = {
  accountId: Scalars['String'];
};

export type Account = {
  __typename?: 'Account';
  id: Scalars['ID'];
  email: Scalars['String'];
  isCompany: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
  providerId?: Maybe<Scalars['String']>;
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID'];
  accountId: Scalars['ID'];
  companyName: Scalars['String'];
  companyImage?: Maybe<Scalars['String']>;
};

export type Employee = {
  __typename?: 'Employee';
  id: Scalars['ID'];
  companyId: Scalars['ID'];
  sectionIds: Array<Scalars['ID']>;
  employeeName: Scalars['String'];
  userId?: Maybe<Scalars['ID']>;
  role?: Maybe<Scalars['String']>;
};

export type Position = {
  __typename?: 'Position';
  id: Scalars['ID'];
  companyId: Scalars['ID'];
  positionName: Scalars['String'];
};

export type Section = {
  __typename?: 'Section';
  id: Scalars['ID'];
  companyId: Scalars['ID'];
  sectionName: Scalars['String'];
};

export type Shift = {
  __typename?: 'Shift';
  id: Scalars['ID'];
  employeeId: Scalars['ID'];
  sectionId: Scalars['ID'];
  positionId: Scalars['ID'];
  startTime: Scalars['DateTime'];
  endTime: Scalars['DateTime'];
  break?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  accountId: Scalars['ID'];
  userName: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  editAccount: Scalars['Boolean'];
  deleteAccount: Scalars['Boolean'];
  signup: LoginResponse;
  login: LoginResponse;
  editCompany: Scalars['Boolean'];
  addEmployee: Scalars['String'];
  editEmployee: Scalars['Boolean'];
  connectUserToEmployee: Scalars['Boolean'];
  deleteEmployee: Scalars['Boolean'];
  addPosition: Scalars['Boolean'];
  editPosition: Scalars['Boolean'];
  deletePosition: Scalars['Boolean'];
  addSection: Scalars['Boolean'];
  editSection: Scalars['Boolean'];
  deleteSection: Scalars['Boolean'];
  addShift: Scalars['Boolean'];
  editShift: Scalars['Boolean'];
  deleteShift: Scalars['Boolean'];
  editUser: Scalars['Boolean'];
};


export type MutationEditAccountArgs = {
  data: EditAccountInput;
  accountId: Scalars['String'];
};


export type MutationDeleteAccountArgs = {
  accountId: Scalars['String'];
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationEditCompanyArgs = {
  data: EditCompanyInput;
  accountId: Scalars['String'];
};


export type MutationAddEmployeeArgs = {
  data: EmployeeInput;
};


export type MutationEditEmployeeArgs = {
  data: EditEmployeeInput;
  employeeId: Scalars['String'];
};


export type MutationConnectUserToEmployeeArgs = {
  userId: Scalars['String'];
  employeeId: Scalars['String'];
};


export type MutationDeleteEmployeeArgs = {
  employeeId: Scalars['String'];
};


export type MutationAddPositionArgs = {
  companyId: Scalars['String'];
  positionName: Scalars['String'];
};


export type MutationEditPositionArgs = {
  positionName: Scalars['String'];
  positionId: Scalars['String'];
};


export type MutationDeletePositionArgs = {
  positionId: Scalars['String'];
};


export type MutationAddSectionArgs = {
  companyId: Scalars['String'];
  sectionName: Scalars['String'];
};


export type MutationEditSectionArgs = {
  sectionName: Scalars['String'];
  sectionId: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  sectionId: Scalars['String'];
};


export type MutationAddShiftArgs = {
  data: EditShiftInput;
};


export type MutationEditShiftArgs = {
  data: EditShiftInput;
  shiftId: Scalars['String'];
};


export type MutationDeleteShiftArgs = {
  shiftId: Scalars['String'];
};


export type MutationEditUserArgs = {
  data: EditUserInput;
  accountId: Scalars['String'];
};

export type EditAccountInput = {
  email?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  token: Scalars['String'];
  accountId: Scalars['String'];
  isCompany: Scalars['Boolean'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  isCompany: Scalars['Boolean'];
  name: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type EditCompanyInput = {
  companyName?: Maybe<Scalars['String']>;
  companyImage?: Maybe<Scalars['String']>;
};

export type EmployeeInput = {
  employeeName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  sectionIds?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
  companyId: Scalars['String'];
};

export type EditEmployeeInput = {
  employeeName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  sectionIds?: Maybe<Scalars['String']>;
  role?: Maybe<Scalars['String']>;
};

export type EditShiftInput = {
  employeeId?: Maybe<Scalars['String']>;
  sectionId?: Maybe<Scalars['String']>;
  positionId?: Maybe<Scalars['String']>;
  startTime?: Maybe<Scalars['DateTime']>;
  endTime?: Maybe<Scalars['DateTime']>;
  break?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
};

export type EditUserInput = {
  userName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  profileImage?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'token' | 'accountId' | 'isCompany'>
  ) }
);


export const LoginDocument = gql`
    mutation Login($data: LoginInput!) {
  login(data: $data) {
    token
    accountId
    isCompany
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;