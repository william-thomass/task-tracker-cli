import { type Task, type TaskRepositoy } from "../repositories/task-repository.js"

interface DeleteTaskRequest {
  id: string
}

interface DeleteTaskResponse {
  task: Task 
}

export class DeleteUseCase{
  constructor( private taskRepository : TaskRepositoy){}

  async execute({
    id,
  }:DeleteTaskRequest): Promise<DeleteTaskResponse>{

    if(!id){
      throw new Error('Id not found')
    }

    const task = await this.taskRepository.delete(
      id,
    )


    return {task}
  }
}