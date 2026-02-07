import { TaskInterface } from '../tasks/task.interface';

export interface UserInterface {
  id: string;
  username: string;
  password: string;
  tasks: TaskInterface[];
}
