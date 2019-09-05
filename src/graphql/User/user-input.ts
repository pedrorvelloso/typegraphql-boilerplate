import { InputType, Field } from 'type-graphql';
import { User } from '~/entity/User';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  password: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;
}
