import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Task } from '../../tasks/SQL/task.entity';
import { UserInterface } from '../user.interface';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements UserInterface {
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
  username: string;

  @Prop()
  password: string;

  @Prop([{ type: String, ref: 'Task' }])
  tasks: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
