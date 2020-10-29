import { Query, Resolver } from "type-graphql";
import { Company } from "../entity/Company";


@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  companies() {
    return Company.find();
  }
}