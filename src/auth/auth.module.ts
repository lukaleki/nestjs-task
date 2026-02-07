import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './SQL/user.entity';
import { UsersRepositoryAbstract } from './users.repository.abstract';
// import { UsersRepositorySql } from './users.repositorySql';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModelMongo } from './Mongo/users.model-mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './Mongo/user.schema';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
    }),
    // JwtModule.register({
    //   secret: 'secret',
    //   signOptions: {
    //     expiresIn: 3600,
    //   },
    // }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    // TypeOrmModule.forFeature([User]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: UsersRepositoryAbstract,
      // useClass: UsersRepositorySql,
      useClass: UsersModelMongo,
    },
  ],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class AuthModule {}
