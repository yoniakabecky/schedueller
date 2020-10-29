import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => ID)
  @Column()
  accountId: string;

  @Field()
  @Column()
  userName: string;

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
