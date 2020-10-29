import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("companies")
export class Company extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: number;

  @Field(() => ID)
  @Column()
  accountId: string;

  @Field()
  @Column()
  companyName: string;

  @Field({ nullable: true })
  @Column()
  companyImage: string;
}
