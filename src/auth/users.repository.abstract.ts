import { AuthCredentialsDto } from './auth-dto/auth-credentials.dto';
import { UserInterface } from './user.interface';

export abstract class UsersRepositoryAbstract {
  abstract createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
  abstract findUserByUsername(username: string): Promise<UserInterface | null>;
}
