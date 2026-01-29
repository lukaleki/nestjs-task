import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import * as taskModel from './task.model';
import { CreateTaskDTO } from './DTO/create-task.dto';
import { GetTasksFilterDTO } from './DTO/get-tasks-filter.dto';
import { UpdateTaskStatusDTO } from './DTO/update-task-status.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDTO): taskModel.Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get(':id')
  getTask(@Param('id') id: string): taskModel.Task {
    return this.tasksService.getTaskById(id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDTO,
  ): taskModel.Task {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateStatusById(id, status);
  }

  // user can add properties we don't support(not big but problem)
  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }

  // better way
  //   @Post()
  //   createTask(
  //     @Body('title') title: string,
  //     @Body('description') description: string,
  //   ): taskModel.Task {
  //     return this.tasksService.createTask(title, description);
  //   }
  // }

  // best way using DTO
  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO): taskModel.Task {
    return this.tasksService.createTask(createTaskDTO);
  }
}
