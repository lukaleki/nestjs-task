import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './DTO/update-task-status.dto';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import type { UserInterface } from '../auth/user.interface';
import { TaskInterface } from './task.interface';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDTO,
    @GetUser() user: UserInterface,
  ): Promise<TaskInterface[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Get(':id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: UserInterface,
  ): Promise<TaskInterface> {
    return this.tasksService.getTaskById(id, user);
  }

  @Delete(':id')
  deleteTask(
    @Param('id') id: string,
    @GetUser() user: UserInterface,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
    @GetUser() user: UserInterface,
  ): Promise<TaskInterface> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatusById(id, status, user);
  }

  @Post()
  createTask(
    @Body() createTaskDTO: CreateTaskDTO,
    @GetUser() user: UserInterface,
  ): Promise<TaskInterface> {
    return this.tasksService.createTask(createTaskDTO, user);
  }
}
