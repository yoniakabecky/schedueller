import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import {
  Account,
  EditAccountInput,
  LoginResponse,
  LoginInput,
  SignupInput,
} from "../entity/Account";
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

  @Query(() => Account)
  async getAccount(@Arg("accountId") accountId: string): Promise<Account> {
    try {
      const account = await Account.findOne({
        where: { _id: new ObjectId(accountId) },
      });
      if (!account) throw new Error("Account not found");

      return account;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async editAccount(
    @Arg("accountId") accountId: string,
    @Arg("data") data: EditAccountInput
  ) {
    try {
      await getMongoManager().findOneAndUpdate<Account>(
        Account,
        { _id: new ObjectId(accountId) },
        { $set: { ...data } }
      );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Arg("accountId") accountId: string) {
    try {
      const account = await Account.findOne({
        where: { _id: new ObjectId(accountId) },
      });
      if (!account) throw new Error("Account not found");

      await getMongoManager().findOneAndDelete<Account>(Account, {
        _id: new ObjectId(accountId),
      });

      if (account.isCompany) {
        await getMongoManager().findOneAndDelete<Company>(Company, {
          accountId: new ObjectId(accountId),
        });
      } else {
        await getMongoManager().findOneAndDelete<User>(User, {
          accountId: new ObjectId(accountId),
        });
      }
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => LoginResponse)
  async signup(
    @Arg("data")
    { email, password, confirmPassword, isCompany, name }: SignupInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    try {
      const isAccountExist = await Account.findOne({ email });
      if (isAccountExist) throw new UserInputError("Email is already in use");
      if (password !== confirmPassword)
        throw new UserInputError("Password must be same");

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAccount = await Account.insert({
        email,
        isCompany,
        password: hashedPassword,
      });

      const newAccountId: ObjectId = newAccount.raw.insertedId;

      if (isCompany) {
        await Company.insert({
          companyName: name,
          accountId: newAccountId,
        });
      } else {
        await User.insert({
          userName: name,
          accountId: newAccountId,
        });
      }

      const token = createAccessToken(newAccountId);
      res.cookie("jwt", token, { httpOnly: true });

      return {
        token,
        accountId: newAccountId.toHexString(),
        isCompany: isCompany,
      };
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") { email, password }: LoginInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const account = await Account.findOne({ email });
    if (!account) throw new Error("Account not found");

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    const token = createAccessToken(account.id);
    res.cookie("jwt", token, { httpOnly: true });

    return {
      token,
      accountId: account.id.toHexString(),
      isCompany: account.isCompany,
    };
  }
}
