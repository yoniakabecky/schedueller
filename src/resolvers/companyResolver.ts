import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Company, CompanySignupInput } from "../entity/Company";
import { User } from "../entity/User";

@Resolver()
export class CompanyResolver {
  @Query(() => [Company])
  companies() {
    return Company.find();
  }

  @Mutation(() => Boolean)
  async companySignup(
    @Arg("data") { email, companyName, password, confirmPassword }: CompanySignupInput
  ) {
    try {
      const companyAccount = await Company.findOne({ email });
      const userAccount = await User.findOne({ email });
      if (companyAccount || userAccount) throw new UserInputError('Email is already in use');

      if (password !== confirmPassword) throw new UserInputError('Password must be same');

      const hashedPassword = await bcrypt.hash(password, 10);

      await Company.insert({
        email,
        companyName,
        password: hashedPassword
      });

    } catch (err) {
      console.error(err);
      return err;
    }

    return true;
  }
}