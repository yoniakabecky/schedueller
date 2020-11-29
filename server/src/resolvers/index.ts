import { AccountResolver } from "./accountResolver";
import { CompanyResolver } from "./companyResolver";
import { EmployeeResolver } from "./employeeResolver";
import { PositionResolver } from "./positionResolver";
import { SectionResolver } from "./sectionResolver";
import { ShiftResolver } from "./shiftResolver";
import { UserResolver } from "./userResolver";

export default [
  AccountResolver,
  CompanyResolver,
  UserResolver,
  SectionResolver,
  EmployeeResolver,
  PositionResolver,
  ShiftResolver
] as const;