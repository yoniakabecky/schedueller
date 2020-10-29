import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: number;

  @Field()
  userName: string;

  @Field()
  email: string;

  password: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  provider: string;

  @Field({ nullable: true })
  providerId: string;

  @Field({ nullable: true })
  profileImage: string;
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
  @IsNotEmpty()
  @MinLength(2, { message: "userName has to be longer than $constraint1 characters" })
  userName: string;
}
