import { ObjectId } from "mongodb";
import { Arg, Query, Resolver } from "type-graphql";
import { Company } from "../entity/Company";

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  companies() {
    return Company.find();
  }

  @Query(() => Company)
  async getCompany(@Arg("accountId") accountId: string) {
    try {
      const company = await Company.findOne({ accountId: new ObjectId(accountId) });
      if (!company) throw new Error('Company not found');

      return company;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}