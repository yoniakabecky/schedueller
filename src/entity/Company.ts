import { IsNotEmpty, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ObjectIdColumn } from "typeorm";
import { SigninInput } from "./User";

@ObjectType()
@Entity("companies")
export class Company extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: number;

  @Field()
  companyName: string;

  @Field()
  email: string;

  password: string;

  @Field({ nullable: true })
  profileImage: string;
}

@InputType()
export class CompanySignupInput extends SigninInput {
  @Field()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: "userName has to be longer than $constraint1 characters" })
  companyName: string;
}
