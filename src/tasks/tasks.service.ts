import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { TasksRepository } from './tasks.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find({
      where: {},
    });
  }

  async getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  async deleteTask(id: string) {
    const found = await this.getTaskById(id);
    await this.tasksRepository.remove(found);
  }

  async updateStatusById(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);

    return task;
  }

  async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDTO: CreateTaskDTO): Task {
  //   const { title, description } = createTaskDTO;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //
  //   this.tasks.push(task);
  //
  //   return task;
  // }
}
