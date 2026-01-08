import { FsTaskRepository } from "../../repositories/fs/fs-repository.js";
import { CreateUseCase } from "../create-use-case.js";

export function makeCreateUseCase(){
  const fsRepository = new FsTaskRepository()
  const useCase = new CreateUseCase(fsRepository)

  return useCase
}