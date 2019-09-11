import { Resolver, Query, Mutation, Arg, Ctx, Authorized } from 'type-graphql';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { Repository } from 'typeorm';

import { CreateUserInput, LoginInput } from './user-input';

import AuthService from '~/auth/auth-service';
import { User } from '~/entity/User';
import { LoginPayload } from '~/auth/auth-payload';
import { AuthContext } from '~/auth/auth-context';

@Service()
@Resolver(of => User)
export class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  @Authorized()
  @Query(returns => [User])
  async allUsers(): Promise<User[] | undefined> {
    return this.userRepository.find();
  }

  @Authorized()
  @Query(returns => User)
  async me(@Ctx() { user }: AuthContext) {
    return this.userRepository.findOneOrFail({ id: user.id });
  }

  @Mutation(returns => LoginPayload)
  async login(@Arg('input') loginData: LoginInput): Promise<LoginPayload> {
    return this.authService.authenticate(loginData.email, loginData.password);
  }

  @Mutation(returns => User)
  async createUser(
    @Arg('input') createUserData: CreateUserInput,
  ): Promise<User> {
    const user = this.userRepository.create(createUserData);
    return this.userRepository.save(user);
  }
}
