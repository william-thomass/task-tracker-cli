import { TaskStatus, type Task, type TaskRepositoy } from "../repositories/task-repository.js"

interface updateTaskRequest {
  id: string
  status?: TaskStatus
  description?: string 

}

interface updateTaskResponse {
  task: Task
}

export class updateTaskUseCase{
  constructor( private taskRepository : TaskRepositoy){}

  async execute({
    id,
    status,
    description
  }:updateTaskRequest): Promise<updateTaskResponse>{

    const task = await this.taskRepository.findById(id)

    if(!task){
      throw new Error ('Task not found')
     
    }

    const taskData : Task = {
      ...task,
      status: status ?? task.status,
      description: description ?? task.description,
      updatedAt: new Date()
    }

    const taskUpdate = await this.taskRepository.update(taskData)



    return {task: taskUpdate}
  }
}