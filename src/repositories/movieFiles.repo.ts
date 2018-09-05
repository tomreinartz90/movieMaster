import { BaseRepo } from "./base.repo";
import { SourceFileModel } from "../models/SourceFile.model";

export class MovieFilesRepo extends BaseRepo<SourceFileModel> {
  public getKey( obj: SourceFileModel ): string {
    return obj.uuid;
  }
}