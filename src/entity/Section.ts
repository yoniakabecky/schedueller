import { ObjectId } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("sections")
export class Section extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => ID)
  @Column()
  companyId: ObjectId;

  @Field()
  @Column()
  sectionName: string;
}