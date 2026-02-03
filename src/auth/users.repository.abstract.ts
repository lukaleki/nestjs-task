import { AuthCredentialsDto } from './auth-dto/auth-credentials.dto';
import { User } from './user.entity';

export abstract class UsersRepositoryAbstract {
  abstract createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
  abstract signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }>;

  abstract findUserByUsername(username: string): Promise<User | null>;
}
