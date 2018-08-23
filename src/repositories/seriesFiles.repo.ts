import { BaseRepo } from "./base.repo";
import { SourceFileModel } from "../models/SourceFile.model";

export class SeriesFilesRepo extends BaseRepo<SourceFileModel> {
  public getKey( obj ): string {
    return Buffer.from( `${obj.path}${obj.file}` ).toString( 'hex' );
  }

  constructor() {
    super();
  }

  getAllGrouped(){
    const files = super.getAll();
    const groupedFiles = {};
    files.forEach(file => {

      //assumption that all series are stored in the same folder with a corresponding name
      const startPath = file.path.split('/')[1];
      if(!groupedFiles[startPath]){
        groupedFiles[startPath] = [];
      }
      groupedFiles[startPath].push(file);
    });

    return groupedFiles;

  }

}