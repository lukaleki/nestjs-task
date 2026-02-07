import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// mongo
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModelMongo } from './Mongo/tasks.model-mongo';
import { Task, TaskSchema } from './Mongo/task.schema';

// SQL
// import { Task } from './task.entity';
// import { TasksRepositorySql } from './tasks.repositorysql';

@Module({
  imports: [
    ConfigModule,
    // TypeOrmModule.forFeature([Task]),
    AuthModule,
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [
    TasksService,
    { provide: TasksRepositoryAbstract, useClass: TasksModelMongo },
  ],
})
export class TasksModule {}
