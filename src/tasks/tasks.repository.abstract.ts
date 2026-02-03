import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';

export abstract class TasksRepositoryAbstract {
  abstract getTasks(filterDto: GetTasksFilterDTO): Promise<Task[]>;
  abstract createTask(createTaskDto: CreateTaskDTO): Promise<Task>;
  abstract getTaskById(id: string): Promise<Task>;
  abstract deleteTask(id: string): Promise<void>;
  abstract updateStatusById(id: string, status: TaskStatus): Promise<Task>;
}
