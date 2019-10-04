import { InputType, Field, Int } from 'type-graphql';
import { Min } from 'class-validator';
import { Operators } from './operator-enum';

@InputType()
class ConditionSearch {
  @Field(type => Operators)
  operator: Operators;
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

  @Field(type => [ConditionSearch])
  conditions: ConditionSearch[];
}
