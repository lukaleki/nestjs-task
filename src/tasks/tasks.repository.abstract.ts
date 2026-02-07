import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { UserInterface } from '../auth/user.interface';
import { TaskInterface } from './task.interface';

export abstract class TasksRepositoryAbstract {
  abstract getTasks(
    filterDto: GetTasksFilterDTO,
    user: UserInterface,
  ): Promise<TaskInterface[]>;
  abstract createTask(
    createTaskDto: CreateTaskDTO,
    user: UserInterface,
  ): Promise<TaskInterface>;
  abstract getTaskById(id: string, user: UserInterface): Promise<TaskInterface>;
  abstract deleteTask(id: string, user: UserInterface): Promise<void>;
  abstract updateStatusById(
    id: string,
    status: TaskStatus,
    user: UserInterface,
  ): Promise<TaskInterface>;
}
