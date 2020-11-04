import { ObjectId } from "mongodb";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getMongoManager } from "typeorm";
import { Section } from "../entity/Section";

@Resolver()
export class SectionResolver {
  @Query(() => [Section])
  sections() {
    return Section.find();
  }

  @Query(() => [Section])
  async getOurSections(@Arg("companyId") companyId: string) {
    try {
      const sections = await Section.find({ companyId: new ObjectId(companyId) });
      if (sections.length === 0) throw new Error("Section not found");

      return sections;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  @Mutation(() => Boolean)
  async addSection(
    @Arg("sectionName") sectionName: string,
    @Arg("companyId") companyId: string
  ) {
    try {
      const section = await Section.findOne({ sectionName, companyId: new ObjectId(companyId) });
      if (section) throw new Error("Section already exist");

      await Section.insert({ sectionName, companyId: new ObjectId(companyId) });
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async editSection(
    @Arg("sectionId") sectionId: string,
    @Arg("sectionName") sectionName: string
  ) {
    try {
      await getMongoManager()
        .findOneAndUpdate<Section>(
          Section,
          { _id: new ObjectId(sectionId) },
          { $set: { sectionName } }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async deleteSection(
    @Arg("sectionId") sectionId: string
  ) {
    try {
      const section = await Section.findOne({ where: { _id: new ObjectId(sectionId) } });
      if (!section) throw new Error('Section not found');

      await getMongoManager()
        .findOneAndDelete<Section>(
          Section,
          { _id: new ObjectId(sectionId) }
        );
    } catch (error) {
      console.error(error);
      return error;
    }

    return true;
  }
}