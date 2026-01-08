import { makeFindAllUseCase } from "./use-cases/factories/find-all-factory.js";
import { makeCreateUseCase } from "./use-cases/factories/make-create-factory.js";

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

      console.log(`✅ Task ${task.description} create with sucessufull `)
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
    default:
      console.log('Command not found, please: add, list')
  
  }

}

run();