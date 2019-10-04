import { InputType, Field, Int, ArgsType } from 'type-graphql';
import { User } from '~/entity/User';
import { IsEmail, Min, IsAlphanumeric, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  password: string;

  @Field()
  @MinLength(6)
  @MaxLength(32)
  @IsAlphanumeric()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}

@ArgsType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
