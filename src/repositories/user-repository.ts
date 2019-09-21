import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '~/entity/User';
import { GraphQLError } from 'graphql';
import { CreateUserInput } from '~/graphql/User/user-input';

@Service()
export default class UserRepository {
  constructor(
    @InjectRepository(User) public readonly repository: Repository<User>,
  ) {}

  public async paginateAndSearch(
    page: number,
    limit: number,
    query: string | undefined,
  ) {
    const offset = (page - 1) * limit;
    const queryBuilder = this.repository
      .createQueryBuilder('user')
      .offset(offset)
      .limit(limit);

    queryBuilder.where('user.username LIKE :query', {
      query: `%${query || ''}%`,
    });

    queryBuilder.orWhere('user.email LIKE :query', {
      query: `%${query || ''}%`,
    });

    const [users, totalCount] = await queryBuilder.getManyAndCount();
    return { users, totalCount };
  }

  public async create(payload: CreateUserInput) {
    const userAlreadyExists = await this.repository.findOne({
      where: [{ email: payload.email }, { username: payload.username }],
    });

    if (!!userAlreadyExists) throw new GraphQLError('User already exists!');

    const user = this.repository.create(payload);
    return this.repository.save(user);
  }
}
