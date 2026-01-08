import {  TaskStatus, type Task, type TaskRepositoy } from "../repositories/task-repository.js"

interface createTaskRequest {
  description: string
}

interface createTaskResponse {
  task: Task
}

export class CreateUseCase{
  constructor( private taskRepository : TaskRepositoy){}

  async execute({
    description,
  }:createTaskRequest): Promise<createTaskResponse>{
    const task = await this.taskRepository.create({
      description,
      status: TaskStatus.TODO,
   })

    return {task}
  }
}