import { ObjectId } from "mongodb";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("employee")
export class Employee extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => ID)
  @Column()
  companyId: ObjectId;

  @Field(() => [ID])
  @Column()
  sectionIds: ObjectId[];

  @Field()
  @Column()
  employeeName: string;

  @Field(() => ID, { nullable: true })
  @Column()
  userId: ObjectId;

  @Field({ nullable: true })
  @Column()
  role: string;
}

@InputType()
export class EditEmployeeInput {
  @Field({ nullable: true })
  employeeName: string;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  sectionIds: string;

  @Field({ nullable: true })
  role: string;
}

@InputType()
export class EmployeeInput extends EditEmployeeInput {
  @Field()
  companyId: string;
}
