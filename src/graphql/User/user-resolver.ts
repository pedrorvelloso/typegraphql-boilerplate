import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Repository } from 'typeorm';
import { User } from '~/entity/User';

import { CreateUserInput } from './user-input';

@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @Query(returns => [User])
  async allUsers(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  @Mutation(returns => User)
  async createUser(@Arg('input') createUserData: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(createUserData);
    return this.userRepository.save(user);
  }
}
