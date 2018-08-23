import { SourceFileModel } from "../models/SourceFile.model";

const fs = require( 'fs' );

export function walkSync( path:string, fileList:SourceFileModel[] = [], basePath:string = path ):SourceFileModel[]{
  let files = fs.readdirSync( path );
  // let basePath = basePath;
  fileList = fileList || [];
  files.forEach(  ( file ) => {
    if ( fs.statSync( path + '/' + file ).isDirectory() ) {
      fileList = walkSync( path + '/' + file, fileList, basePath );
    }
    else {

      fileList.push( {path: path.replace(basePath, ''), file, basePath} );
    }
  } );

  return fileList;
}
