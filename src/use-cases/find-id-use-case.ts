import { type Task, type TaskRepositoy } from "../repositories/task-repository.js"

interface FindIdTaskRequest {
  id: string
}

interface FindIdTaskResponse {
  task: Task | null
}

export class FindByIdUseCase{
  constructor( private taskRepository : TaskRepositoy){}

  async execute({
    id,
  }:FindIdTaskRequest): Promise<FindIdTaskResponse>{



    const task = await this.taskRepository.findById(
      id,
    )


    return {task}
  }
}