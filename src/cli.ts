import { TaskStatus } from "./repositories/task-repository.js";
import { makeDeleteUseCase } from "./use-cases/factories/delete-factory.js";
import { makeFindAllUseCase } from "./use-cases/factories/find-all-factory.js";
import { makeCreateUseCase } from "./use-cases/factories/make-create-factory.js";
import { makeUpdateTaskUseCase } from "./use-cases/factories/updatel-factory.js";

const [,,command, ...args] = process.argv

 export async function run(){

  switch(command){
    case 'add':
      const description = args.join('')

      if(!description){
        console.log(' Description requerided')
      }
      const createTaskUseCase = makeCreateUseCase()
      const {task } = await createTaskUseCase.execute({description})

      console.log(`✅ Task ${task.description} create with successful `)
    break;
    case 'list':
      const status = args[0] as any
      

      const findAllUsecase = makeFindAllUseCase()
      const {tasks} = await findAllUsecase.execute({status})

      if(tasks.length === 0){
        console.log('Task not found')
        return
      }

      console.table(tasks)
    break;
    case "update":{
      const id = args[0]
      const description = args.slice(1).join('')

      if(!id || !description){
        console.error('Uso: npm run task -- update <id> <nova descrição>')
        return
      }

      const updateTaskUseCase = makeUpdateTaskUseCase()
      await updateTaskUseCase.execute({ id, description})
      
      console.log(`✅ Task ${id} update successful!`);
      }
    break;
    case "mark-in-progress":{
      const id = args[0]
      if(!id){
       return console.error('Id required for update status')
      }

      const updateTaskUseCase = makeUpdateTaskUseCase()
      await updateTaskUseCase.execute({id, status: TaskStatus.IN_PROCESS})

      console.log(`⏳ Task ${id} update status to in progress.`);
      break;
    }
    case 'mark-done':{
      const id = args[0]

     if(!id){
      return console.log('Id required for update status')
     }

     const updateTaskUseCase = makeUpdateTaskUseCase()
     await updateTaskUseCase.execute({ id, status:TaskStatus.DONE})

     console.log(`✅ Task ${id} update status for done`)

     break;
    }

    case "delete":{
      const id = args[0]

      if(!id){
        return console.log(`Id not found`)
      }

      const deleteUseCase = makeDeleteUseCase()
      await deleteUseCase.execute({
        id
      })

      console.log(`❌ Task ${id} deleted successfully`)
      break;
    }


    default:
      console.log('Command not found, please: add, list, update or delete')
      
  
  }

}

run();