import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksSchema } from './schemas/tasks.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: TasksSchema }
    ])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {
    
}
