import { InputType, Field, Int } from 'type-graphql';
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

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class SearchInput {
  @Field(type => Int, { nullable: true, defaultValue: 1 })
  @Min(1)
  page: number;

  @Field(type => Int, { nullable: true, defaultValue: 10 })
  limit: number;

  @Field({ nullable: true })
  query?: string;
}
