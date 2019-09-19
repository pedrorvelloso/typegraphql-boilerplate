import { User } from '~/entity/User';
import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class AllUsersPayload {
  @Field(type => Int)
  totalCount: number;
  @Field(type => [User], { nullable: true })
  edges: User[];
}
