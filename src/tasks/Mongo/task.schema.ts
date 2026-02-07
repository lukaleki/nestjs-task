import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../task-status.enum';
import { User } from '../../auth/SQL/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { TaskInterface } from '../task.interface';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task implements TaskInterface {
  @Prop({
    type: String,
    default: function genUUID(): string {
      return uuidv4();
    },
    required: false,
  })
  _id: string;

  id: string;

  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop({ type: String, ref: 'User' })
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
