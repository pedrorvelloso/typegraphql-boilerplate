import { registerEnumType } from 'type-graphql';

export enum Operators {
  OR = 'or',
  AND = 'and',
}

registerEnumType(Operators, {
  name: 'Operators',
  description: 'Change query builder WHERE condition',
});
