import { ObjectId } from "mongodb";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => ID)
  @Column()
  accountId: ObjectId;

  @Field()
  @Column()
  displayName: string;

  @Field({ nullable: true })
  @Column()
  firstName: string;

  @Field({ nullable: true })
  @Column()
  lastName: string;

  @Field({ nullable: true })
  @Column()
  profileImage: string;
}

@InputType()
export class EditUserInput {
  @Field({ nullable: true })
  displayName: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  profileImage: string;
}
