import { ObjectId } from "mongodb";
import { Arg, Query, Resolver } from "type-graphql";
import { User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  async getUser(@Arg("accountId") accountId: string) {
    try {
      const user = await User.findOne({ accountId: new ObjectId(accountId) });
      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}