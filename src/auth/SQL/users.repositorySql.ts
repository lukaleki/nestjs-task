import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth-dto/auth-credentials.dto';
import { UsersRepositoryAbstract } from '../users.repository.abstract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepositorySql
  extends Repository<User>
  implements UsersRepositoryAbstract
{
  constructor(datasource: DataSource) {
    super(User, datasource.createEntityManager());
  }
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const salt: string = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if ((error as { code: string }).code === '23505') // duplicate username
      {
        throw new ConflictException(error);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return await this.findOne({ where: { username } });
  }
}
