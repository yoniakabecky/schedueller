import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Account, LoginResponse, SigninInput, SignupInput } from "../entity/Account";
import { Company } from "../entity/Company";
import { User } from "../entity/User";
import { createAccessToken } from "../utils/createToken";
import { MyContext } from "../utils/myContext";

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
      const isAccountExist = await Account.findOne({ email });
      if (isAccountExist) throw new UserInputError("Email is already in use");
      if (password !== confirmPassword) throw new UserInputError("Password must be same");

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

      return true;

    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") { email, password }: SigninInput,
    @Ctx() { res }: MyContext
  ) {
    const account = await Account.findOne({ email });
    if (!account) throw new Error('Account not found');

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    const token = createAccessToken(account);
    res.cookie("jwt", token, { httpOnly: true });

    return {
      token,
      accountId: account.id
    };
  }
}