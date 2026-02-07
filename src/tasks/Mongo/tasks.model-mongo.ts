import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { TasksRepositoryAbstract } from '../tasks.repository.abstract';
import { Task } from './task.schema';
import { CreateTaskDTO } from '../DTO/create-task.dto';
import { GetTasksFilterDTO } from '../DTO/get-tasks-filter.dto';
import { TaskStatus } from '../task-status.enum';
import { User } from '../../auth/Mongo/user.schema';
// import { TasksModule } from './tasks.module';

@Injectable()
export class TasksModelMongo implements TasksRepositoryAbstract {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const filter: Record<string, any> = { user: user };

    if (status) {
      filter.status = status;
    }

    if (search) {
      const searchFilter = new RegExp(search, 'i');

      filter.$or = {
        description: searchFilter,
        title: searchFilter,
      };
    }

    return await this.taskModel.find(filter).lean().exec();
  }

  async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new this.taskModel({
      title,
      description,
      status: TaskStatus.OPEN,
      user: user._id,
    });
    const savedTask = await task.save();
    return savedTask.toObject();
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.taskModel
      .findOne({ _id: id, user: user })
      .lean()
      .exec();
    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return found;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const { deletedCount } = await this.taskModel.deleteOne({
      _id: id,
      user: user,
    });

    if (!deletedCount) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
  }

  async updateStatusById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: id, user: user }).exec();

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    task.status = status;
    await task.save();

    return task.toObject();
  }
}
