import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema'; // Make sure to import your Mongo Schema
import { AuthCredentialsDto } from '../auth-dto/auth-credentials.dto';
import { UsersRepositoryAbstract } from '../users.repository.abstract';

@Injectable()
export class UsersModelMongo implements UsersRepositoryAbstract {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new this.userModel({
      username,
      password: hashedPassword,
      tasks: [],
    });

    try {
      await user.save();
    } catch (error) {
      if ((error as { code: number }).code === 11000) {
        throw new ConflictException('Username already exists');
      } else {
        console.error(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async findUserByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ username }).exec();
  }
}
