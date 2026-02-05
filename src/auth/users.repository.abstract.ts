import { AuthCredentialsDto } from './auth-dto/auth-credentials.dto';
import { User } from './user.entity';

export abstract class UsersRepositoryAbstract {
  abstract createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
  abstract findUserByUsername(username: string): Promise<User | null>;
}
