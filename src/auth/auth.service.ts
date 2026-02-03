import { Injectable } from '@nestjs/common';
import { UsersRepositoryAbstract } from './users.repository.abstract';
import { AuthCredentialsDto } from './auth-dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private repository: UsersRepositoryAbstract) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.repository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.repository.signIn(authCredentialsDto);
  }
}
