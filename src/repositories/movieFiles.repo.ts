import { BaseRepo } from "./base.repo";
import { SourceFileModel } from "../models/SourceFile.model";

export class MovieFilesRepo extends BaseRepo<SourceFileModel> {
  public getKey(obj): string {
    return Buffer.from(`${obj.path}${obj.file}`).toString('hex');
  }
}