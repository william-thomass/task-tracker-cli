import {  TaskStatus, type Task, type TaskRepositoy } from "../repositories/task-repository.js"

interface FindAllTaskRequest {
  status?: TaskStatus
}

interface FindAllTaskResponse {
  tasks: Task[]
}

export class FindAllUseCase{
  constructor( private taskRepository : TaskRepositoy){}

  async execute({
    status,
  }:FindAllTaskRequest): Promise<FindAllTaskResponse>{



    const tasks = await this.taskRepository.findAll(
      status,
    )

    return {tasks}
  }
}