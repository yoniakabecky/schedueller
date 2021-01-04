import { UserInputError } from "apollo-server-express";
import bcrypt from "bcrypt";
import { verify } from "jsonwebtoken";
import { ObjectId } from "mongodb";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
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
import { authenticated } from "../utils/auth";
import { createAccessToken } from "../utils/createToken";
import { MyContext } from "../utils/myContext";

@Resolver()
export class AccountResolver {
  @Query(() => [Account])
  accounts() {
    return Account.find();
  }

  @Query(() => Account, { nullable: true })
  @UseMiddleware(authenticated)
  async getMyAccount(@Ctx() context: MyContext): Promise<Account | null> {
    const authorization = context.req.headers["authorization"];

    if (!authorization) return null;

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);

      const account = await Account.findOne({
        where: { _id: new ObjectId(payload.id) },
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

      return { token };
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("data") { email, password }: LoginInput
  ): Promise<LoginResponse> {
    const account = await Account.findOne({ email });
    if (!account) throw new Error("Account not found");

    const isPasswordValid = await bcrypt.compare(password, account.password);
    if (!isPasswordValid) throw new Error("Wrong password");

    const token = createAccessToken(account.id);

    return { token };
  }
}
