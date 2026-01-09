import { FsTaskRepository } from "../../repositories/fs/fs-repository.js";
import { DeleteUseCase } from "../delete-use-case.js";

export function makeDeleteUseCase(){
  const fsRepository = new FsTaskRepository()
  const useCase = new DeleteUseCase(fsRepository)

  return useCase
}