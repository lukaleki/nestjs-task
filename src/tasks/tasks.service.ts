import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';
import { UserInterface } from '../auth/user.interface';
import { TaskInterface } from './task.interface';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepositoryAbstract) {}

  getTasks(
    filterDto: GetTasksFilterDTO,
    user: UserInterface,
  ): Promise<TaskInterface[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: UserInterface): Promise<TaskInterface> {
    return this.tasksRepository.getTaskById(id, user);
  }

  deleteTask(id: string, user: UserInterface): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  updateStatusById(
    id: string,
    status: TaskStatus,
    user: UserInterface,
  ): Promise<TaskInterface> {
    return this.tasksRepository.updateStatusById(id, status, user);
  }

  createTask(
    createTaskDto: CreateTaskDTO,
    user: UserInterface,
  ): Promise<TaskInterface> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
}
