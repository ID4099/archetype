import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { createTaskDto } from './dto/createTask.dto';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TasksService {
    constructor(@InjectModel('Task') private taskModel: Model<Task>){}

    async getAll(): Promise<Task[]> {
        return await this.taskModel.find();
    }
    async getById(id: string): Promise<Task> {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
            const task = await this.taskModel.findById(id);
            console.log('Task', task)
            return task;
        }
        else throw new NotAcceptableException(`(${id}) is invalid for ObjectId`);

    };
    async create(task: createTaskDto): Promise<String> {
        const newTask = new this.taskModel(task);
        await newTask.save();
        console.log(newTask);
        return 'created';
    }
    async update(taskId: string, task: createTaskDto): Promise<any> {
        if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
            const result = await this.taskModel.findByIdAndUpdate(taskId, task, { new: true });
            return result;
        }
        else throw new NotAcceptableException(`(${taskId}) is invalid for ObjectId`);
    }
    async delete(taskId: string): Promise<any> {
        if (taskId.match(/^[0-9a-fA-F]{24}$/)) {
            const result = await this.taskModel.findByIdAndDelete(taskId);
            return result;
        }
        else throw new NotAcceptableException(`(${taskId}) is invalid for ObjectId`);
    }
}
