import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepositoryAbstract) {}

  getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }

  getTaskById(id: string, user: User): Promise<Task> {
    return this.tasksRepository.getTaskById(id, user);
  }

  deleteTask(id: string, user: User): Promise<void> {
    return this.tasksRepository.deleteTask(id, user);
  }

  updateStatusById(id: string, status: TaskStatus, user: User): Promise<Task> {
    return this.tasksRepository.updateStatusById(id, status, user);
  }

  createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
}
