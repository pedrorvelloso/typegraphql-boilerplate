import { InputType, Field, Int } from 'type-graphql';
import { User } from '~/entity/User';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SearchInput {
  @Field(type => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}
