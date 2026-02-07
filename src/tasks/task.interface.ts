import { TaskStatus } from './task-status.enum';
import { User } from '../auth/SQL/user.entity';

export interface TaskInterface {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  user: User;
}
