import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Account, SignupInput } from "../entity/Account";
import { Company } from "../entity/Company";
import { User } from "../entity/User";

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  accounts() {
    return Account.find();
  }

  @Mutation(() => Boolean)
  async signup(
    @Arg("data") { email, password, confirmPassword, isCompany, name }: SignupInput
  ) {
    try {
      const account = await Account.findOne({ email });
      if (account) throw new UserInputError('Email is already in use');

      if (password !== confirmPassword) throw new UserInputError('Password must be same');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAccount = await Account.insert({
        email,
        isCompany,
        password: hashedPassword
      });

      if (isCompany) {
        await Company.insert({
          companyName: name,
          accountId: newAccount.identifiers[0].id
        })
      } else {
        await User.insert({
          userName: name,
          accountId: newAccount.identifiers[0].id
        })
      }

    } catch (err) {
      console.error(err);
      return err;
    }

    return true;
  }
}