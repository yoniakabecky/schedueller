import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { EditShiftInput, Shift } from "../entity/Shift";

@Resolver()
export class ShiftResolver {
  @Query(() => [Shift])
  shifts() {
    return Shift.find();
  }

  @Mutation(() => Boolean)
  async addShift(
    @Arg("data") { employeeId, sectionId, positionId, ...rest }: EditShiftInput
  ) {
    try {
      await Shift.insert({
        employeeId: new ObjectId(employeeId),
        sectionId: new ObjectId(sectionId),
        positionId: new ObjectId(positionId),
        ...rest
      });
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async editShift(
    @Arg("shiftId") shiftId: string,
    @Arg("data") data: EditShiftInput
  ) {
    const shift = await Shift.findOne({ where: { _id: new ObjectId(shiftId) } })
    if (!shift) throw new Error("Shift not found");

    try {
      await getMongoManager()
        .findOneAndUpdate<Shift>(
          Shift,
          { _id: new ObjectId(shiftId) },
          { $set: { ...data } }
        )
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteShift(
    @Arg("shiftId") shiftId: string
  ) {
    try {
      await getMongoManager()
        .findOneAndDelete<Shift>(
          Shift,
          { _id: new ObjectId(shiftId) }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }
}