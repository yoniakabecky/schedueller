import { ObjectId } from "mongodb";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("shifts")
export class Shift extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => ID)
  @Column()
  employeeId: ObjectId;

  @Field(() => ID)
  @Column()
  sectionId: ObjectId;

  @Field(() => ID)
  @Column()
  positionId: ObjectId;

  @Field()
  @Column()
  startTime: Date;

  @Field()
  @Column()
  endTime: Date;

  @Field({ nullable: true })
  @Column()
  break: string;

  @Field({ nullable: true })
  @Column()
  note: string;
}

@InputType()
export class EditShiftInput {
  @Field({ nullable: true })
  employeeId: string;

  @Field({ nullable: true })
  sectionId: string;

  @Field({ nullable: true })
  positionId: string;

  @Field({ nullable: true })
  startTime: Date;

  @Field({ nullable: true })
  endTime: Date;

  @Field({ nullable: true })
  break: string;

  @Field({ nullable: true })
  note: string;
}
