import { AccountResolver } from "./accountResolver";
import { CompanyResolver } from "./companyResolver";
import { SectionResolver } from "./sectionResolver";
import { UserResolver } from "./userResolver";

export default [
  AccountResolver,
  CompanyResolver,
  UserResolver,
  SectionResolver
] as const;