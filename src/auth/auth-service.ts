import { Service } from 'typedi';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { User } from '~/entity/User';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { LoginPayload } from './auth-interface';

@Service()
export default class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  public async authenticate(
    email: string,
    password: string,
  ): Promise<LoginPayload> {
    try {
      const user = await this.userRepository.findOneOrFail({ email });
      const isCorrectPassword = this.checkPassword(password, user.password);

      if (!isCorrectPassword) throw new Error();

      const token = jwt.sign({ user: { id: user.id } }, 'Graphql', {
        expiresIn: '2y',
      });

      return { user, token };
    } catch {
      throw new GraphQLError('Failed to login');
    }
  }

  public checkPassword(password: string, passwordHash: string): boolean {
    return bcryptjs.compareSync(password, passwordHash);
  }
}
