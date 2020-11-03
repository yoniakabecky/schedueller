import { ObjectID } from "mongodb";
import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("companies")
export class Company extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field(() => ID)
  @Column()
  accountId: ObjectID;

  @Field()
  @Column()
  companyName: string;

  @Field({ nullable: true })
  @Column()
  companyImage: string;
}
