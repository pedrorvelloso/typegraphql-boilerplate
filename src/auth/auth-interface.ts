import { User } from '~/entity/User';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class LoginPayload {
  @Field()
  token: string;
  @Field({ nullable: true })
  user?: User;
}
