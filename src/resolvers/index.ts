import { CompanyResolver } from "./companyResolver";
import { UserResolver } from "./userResolver";

export default [
  UserResolver,
  CompanyResolver
] as const;