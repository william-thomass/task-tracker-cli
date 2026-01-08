import { FsTaskRepository } from "../../repositories/fs/fs-repository.js";
import { FindAllUseCase } from "../find-all-use-case.js";

export function makeFindAllUseCase(){
  const fsRepository = new FsTaskRepository()
  const useCase = new FindAllUseCase(fsRepository)

  return useCase
}