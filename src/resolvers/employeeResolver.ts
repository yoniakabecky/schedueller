import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { Company } from "../entity/Company";
import { EditEmployeeInput, Employee, EmployeeInput } from "../entity/Employee";
import { User } from "../entity/User";
import { createAccessToken } from "../utils/createToken";

@Resolver()
export class EmployeeResolver {
  @Query(() => [Employee])
  employees() {
    return Employee.find();
  }

  @Query(() => [Employee])
  async getMyEmployment(@Arg("userId") userId: string) {
    try {
      return await Employee.find({ where: { userId: new ObjectId(userId) } })
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Query(() => [Employee])
  async getOurEmployees(@Arg("companyId") companyId: string) {
    try {
      return await Employee.find({ where: { companyId: new ObjectId(companyId) } })
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => String)
  async addEmployee(
    @Arg("data") { companyId, sectionIds, role, employeeName }: EmployeeInput
  ) {
    try {
      const company = await Company.findOne({ where: { _id: new ObjectId(companyId) } });
      if (!company) throw new Error('Company not found');

      const sections = toObjectIdArray(sectionIds);

      const newEmployee = await Employee.insert({
        companyId: new ObjectId(companyId),
        sectionIds: sections,
        employeeName,
        role,
      });

      const token = createAccessToken(newEmployee.raw.insertedId as ObjectId);

      return token;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async editEmployee(
    @Arg("employeeId") employeeId: string,
    @Arg("data") { sectionIds, role, employeeName }: EditEmployeeInput
  ) {
    const employee = await Employee.findOne({ where: { _id: new ObjectId(employeeId) } });
    if (!employee) throw new Error('Employee not found');

    const sections = toObjectIdArray(sectionIds);

    try {
      await getMongoManager()
        .findOneAndUpdate<Employee>(
          Employee,
          { _id: new ObjectId(employeeId) },
          { $set: { role, employeeName, sectionIds: sections } }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async connectUserToEmployee(
    @Arg("employeeId") employeeId: string,
    @Arg("userId") userId: string,
  ) {
    const employee = await Employee.findOne({ where: { _id: new ObjectId(employeeId) } });
    if (!employee) throw new Error('Employee not found');

    const user = await User.findOne({ where: { _id: new ObjectId(userId) } });
    if (!user) throw new Error('User not found');

    try {
      await getMongoManager()
        .findOneAndUpdate<Employee>(
          Employee,
          { _id: new ObjectId(employeeId) },
          { $set: { userId } }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteEmployee(
    @Arg("employeeId") employeeId: string,
  ) {
    try {
      await getMongoManager()
        .findOneAndDelete<Employee>(
          Employee,
          { _id: new ObjectId(employeeId) }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }
}

const toObjectIdArray = (ids: string) => ids.split(" ").map(section => new ObjectId(section));
