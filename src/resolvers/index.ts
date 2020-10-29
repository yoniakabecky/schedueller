import { AccountResolver } from "./accountResolver";
import { CompanyResolver } from "./companyResolver";
import { UserResolver } from "./userResolver";


export default [
  AccountResolver,
  CompanyResolver,
  UserResolver
] as const;