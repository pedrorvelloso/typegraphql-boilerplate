import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Service } from 'typedi';
import { CreateUserInput, LoginInput, SearchInput } from './user-input';

import AuthService from '~/auth/auth-service';
import { User } from '~/entity/User';
import { LoginPayload } from '~/auth/auth-payload';
import { AuthContext } from '~/auth/auth-context';
import { AllUsersPayload } from './user-payload';
import UserRepository from '~/repositories/user-repository';
import { GraphQLError } from 'graphql';

@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  @Authorized()
  @Query(returns => AllUsersPayload)
  async allUsers(
    @Arg('input', { nullable: true })
    input: SearchInput,
  ): Promise<AllUsersPayload | undefined> {
    const { users, totalCount } = await this.userRepository.paginateAndSearch(
      input.page,
      input.limit,
      input.query,
    );
    return {
      edges: users,
      totalCount,
    };
  }

  @Authorized()
  @Query(returns => User)
  async me(@Ctx() { user }: AuthContext) {
    return this.userRepository.repository.findOneOrFail({ id: user.id });
  }

  @Mutation(returns => LoginPayload)
  async login(@Arg('input') loginData: LoginInput): Promise<LoginPayload> {
    return this.authService.authenticate(loginData.email, loginData.password);
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('input') createUserData: CreateUserInput,
  ): Promise<User> {
    /**
     * @todo move to repository
     */
    const userAlreadyExists = await this.userRepository.repository.findOne({
      email: createUserData.email,
    });

    if (!!userAlreadyExists) throw new GraphQLError('User already exists!');

    const user = this.userRepository.repository.create(createUserData);
    return this.userRepository.repository.save(user);
  }
}
