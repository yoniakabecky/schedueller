import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("accounts")
export class Account extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field()
  @Column()
  email: string;

  password: string;

  @Field()
  @Column()
  isCompany: boolean;

  @Field({ nullable: true })
  @Column()
  provider: string;

  @Field({ nullable: true })
  @Column()
  providerId: string;
}

@InputType()
export class SigninInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5, { message: "password has to be longer than $constraint1 characters" })
  password: string;
}

@InputType()
export class SignupInput extends SigninInput {
  @Field()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsBoolean()
  isCompany: boolean;

  @Field()
  @IsNotEmpty()
  @MinLength(2, { message: "userName has to be longer than $constraint1 characters" })
  name: string;
}
