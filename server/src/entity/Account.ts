import { ObjectId } from "mongodb";
import { IsBoolean, IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("accounts")
export class Account extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field()
  @Column()
  email: string;

  @Column()
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
export class LoginInput {
  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(5, {
    message: "password has to be longer than $constraint1 characters",
  })
  password: string;
}

@InputType()
export class SignupInput extends LoginInput {
  @Field()
  @IsNotEmpty()
  confirmPassword: string;

  @Field()
  @IsBoolean()
  isCompany: boolean;

  @Field()
  @IsNotEmpty()
  @MinLength(2, {
    message: "displayName has to be longer than $constraint1 characters",
  })
  displayName: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field()
  isCompany: boolean;
}

@InputType()
export class EditAccountInput {
  @Field({ nullable: true })
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  confirmPassword: string;
}
