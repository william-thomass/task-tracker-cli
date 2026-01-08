import fs from 'node:fs/promises';
import type { Task, TaskRepositoy, TaskStatus } from "../task-repository.js";
import path from 'node:path';


export class FsTaskRepository implements TaskRepositoy{
  private filePath = path.resolve(process.cwd(), 'tasks.json')
  
  async findAll(status?: TaskStatus): Promise<Task[]> {
    try {
      const tasksList = await fs.readFile(this.filePath,'utf-8') 

      const tasks: Task[] = JSON.parse(tasksList)

      if(status){
        return tasks.filter( item => item.status === status)
      }

      return tasks
    } catch (error) {
      return [];
    }
   }

  async findById(id: string): Promise<Task | null> {
    const tasks = await this.findAll()

    const tasksId = tasks.find( item => item.id === id)

    return tasksId || null
  }
  
  async create(data: Task): Promise<Task> {
   const tasks = await this.findAll()
   
   const lastID = tasks.length > 0 ? Math.max(...tasks.map(value => Number(value.id))) : 0

  const newTask: Task = {
    ...data,
    id: String(lastID + 1),
    createdAt: new Date(),
    updatedAt: new Date(),

  }

   tasks.push(newTask)

   await fs.writeFile(
    this.filePath,
    JSON.stringify(tasks, null, 2),
    'utf-8'
   )

   return newTask
  }

  async update(data: Task): Promise<Task> {
  const tasks = await this.findAll()

  const updatedTasks = tasks.map(item => {
    if (item.id === data.id) {
      
      return { 
        ...item, 
        ...data, 
        updatedAt: new Date() 
      }
    }

    return item
  })

  
  const taskExists = tasks.some(item => item.id === data.id)
  if (!taskExists) {
    throw new Error('Task not found')
  }

  // 4. Salvamos a lista inteira (com a alteração) no arquivo
  await fs.writeFile(
    this.filePath,
    JSON.stringify(updatedTasks, null, 2),
    'utf-8'
  )

  return { ...data, updatedAt: new Date() }
}

  async delete(id: string): Promise<Task> {
    const tasks = await this.findAll()

    const deleteTask = tasks.find(item => item.id === id)

    if(!deleteTask){
      throw new Error('Not found Task')
    }

    const newTasks = tasks.filter(item => item.id !== id)

    await fs.writeFile(
      this.filePath,
      JSON.stringify(newTasks, null, 2),
      'utf-8',
    )

    return deleteTask
  }
}