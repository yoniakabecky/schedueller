import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { Position } from "../entity/Position";

@Resolver()
export class PositionResolver {
  @Query(() => [Position])
  positions() {
    return Position.find();
  }

  @Query(() => [Position])
  async getOurPositions(@Arg("companyId") companyId: string) {
    try {
      const positions = await Position.find({ companyId: new ObjectId(companyId) });
      if (positions.length === 0) throw new Error("Position not found");

      return positions;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async addPosition(
    @Arg("positionName") positionName: string,
    @Arg("companyId") companyId: string,
  ) {
    try {
      const position = await Position.findOne({ positionName, companyId: new ObjectId(companyId) })
      if (position) throw new Error("Position already exist");

      await Position.insert({ positionName, companyId: new ObjectId(companyId) })
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async editPosition(
    @Arg("positionId") positionId: string,
    @Arg("positionName") positionName: string,
  ) {
    try {
      await getMongoManager()
        .findOneAndUpdate<Position>(
          Position,
          { _id: new ObjectId(positionId) },
          { $set: { positionName } }
        )
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deletePosition(
    @Arg("positionId") positionId: string
  ) {
    try {
      const position = await Position.findOne({ where: { _id: new ObjectId(positionId) } })
      if (!position) throw new Error('Position not found');

      await getMongoManager()
        .findOneAndDelete<Position>(
          Position,
          { _id: new ObjectId(positionId) }
        )
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }
}