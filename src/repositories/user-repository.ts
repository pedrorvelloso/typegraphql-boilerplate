import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Repository } from 'typeorm';

import { User } from '~/entity/User';

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
}
