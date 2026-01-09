import { FsTaskRepository } from "../../repositories/fs/fs-repository.js";
import { updateTaskUseCase } from "../update-use-case.js";

export function makeUpdateTaskUseCase(){
  const fsRepository = new FsTaskRepository()
  const useCase = new updateTaskUseCase(fsRepository)

  return useCase
}