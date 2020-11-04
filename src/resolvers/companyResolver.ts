import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { Company, EditCompanyInput } from "../entity/Company";

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  companies() {
    return Company.find();
  }

  @Query(() => Company)
  async getCompany(@Arg("accountId") accountId: string): Promise<Company> {
    try {
      const company = await Company.findOne({ accountId: new ObjectId(accountId) });
      if (!company) throw new Error('Company not found');

      return company;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async editCompany(
    @Arg("accountId") accountId: string,
    @Arg("data") data: EditCompanyInput
  ) {
    try {
      await getMongoManager()
        .findOneAndUpdate<Company>(
          Company,
          { accountId: new ObjectId(accountId) },
          { $set: { ...data } }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }
}