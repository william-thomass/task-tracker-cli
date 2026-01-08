export enum TaskStatus{
  TODO = 'todo',
  IN_PROCESS = 'in-process',
  DONE = 'done',
}

export interface Task {
  id: string
  description: string
  status: TaskStatus
  createdAt: Date
  updatedAt: Date
}

export interface TaskRepositoy {
  create(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise <Task>
  update(data: Task): Promise <Task>
  delete(id: string): Promise <Task>
  findAll(status?: TaskStatus): Promise<Task[]>
  findById(id: string): Promise<Task|null>
}