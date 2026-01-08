import { FsTaskRepository } from "../../repositories/fs/fs-repository.js";
import { FindByIdUseCase } from "../find-id-use-case.js";

export function makeFindIdUseCase(){
  const fsRepository = new FsTaskRepository()
  const useCase = new FindByIdUseCase(fsRepository)

  return useCase
}