import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { Task } from './task.entity';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { User } from '../auth/user.entity';

export abstract class TasksRepositoryAbstract {
  abstract getTasks(filterDto: GetTasksFilterDTO, user: User): Promise<Task[]>;
  abstract createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task>;
  abstract getTaskById(id: string): Promise<Task>;
  abstract deleteTask(id: string): Promise<void>;
  abstract updateStatusById(id: string, status: TaskStatus): Promise<Task>;
}
