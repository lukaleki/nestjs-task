import { Injectable } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TasksRepositoryAbstract } from './tasks.repository.abstract';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepositoryAbstract) {}

  getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  getTaskById(id: string): Promise<Task> {
    return this.tasksRepository.getTaskById(id);
  }

  deleteTask(id: string): Promise<void> {
    return this.tasksRepository.deleteTask(id);
  }

  updateStatusById(id: string, status: TaskStatus): Promise<Task> {
    return this.tasksRepository.updateStatusById(id, status);
  }

  createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
