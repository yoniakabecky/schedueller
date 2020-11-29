import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { EditUserInput, User } from "../entity/User";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User)
  async getUser(@Arg("accountId") accountId: string): Promise<User> {
    try {
      const user = await User.findOne({ accountId: new ObjectId(accountId) });
      if (!user) throw new Error('User not found');

      return user;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async editUser(
    @Arg("accountId") accountId: string,
    @Arg("data") data: EditUserInput
  ) {
    try {
      await getMongoManager()
        .findOneAndUpdate<User>(
          User,
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