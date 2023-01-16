import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    NotFoundException,
    Put,
    Delete,
    Query,
    Res,
    HttpCode
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/createTask.dto';
import { Response } from 'express';
 
@Controller('tasks')
export class TasksController {

    constructor( private tasksService: TasksService ){}

    @Get()
    main(){
        return 'welcome to tasks module'
    }

    @Get('/all')
    @HttpCode(200)
    async getAll() {
        return {
            status: true,
            message: 'all tasks found',
            result : await this.tasksService.getAll()
        }
    }

    @Get('/:id')
    @HttpCode(200)
    async getById(@Param('id') taskId: string) {
        const task = await this.tasksService.getById(taskId);
        if(!task) throw new NotFoundException('Task not found');
        return {
            status: true,
            message: `task ${taskId} found`,
            result: task
        }
    }

    @Post('/create')
    @HttpCode(201)
    async newTask(@Body() task: createTaskDto) {
        return {
            status: true,
            message: 'New task on db',
            result: await this.tasksService.create(task)
        }
    }
    @Put('/update/:id')
    @HttpCode(200)
    async update(@Param('id') taskId: string, @Body() task: createTaskDto){
        const taskUpdated = await this.tasksService.update(taskId, task);
        if(!taskUpdated) throw new NotFoundException('Task not found');
        return {
            status: true,
            message: 'Task successfully updated',
            result: taskUpdated
        }
    }
    @Delete('/delete')
    @HttpCode(200)
    async delete(@Query('taskId') id: string){
        const taskDeleted = await this.tasksService.delete(id);
        console.log(taskDeleted);
        return {
            status: true,
            message: 'Task deleted',
            result: taskDeleted 
        }
    }
}
