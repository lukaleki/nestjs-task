import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepositorySql } from './tasks.repositorysql';
import { Task } from './task.entity';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: TasksRepositoryAbstract, useClass: TasksRepositorySql },
  ],
})
export class TasksModule {}
