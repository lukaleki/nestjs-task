import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepositorySql } from './tasks.repositorysql';
import { Task } from './task.entity';
import { TasksRepositoryAbstract } from './tasks.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: TasksRepositoryAbstract, useClass: TasksRepositorySql },
  ],
})
export class TasksModule {}
