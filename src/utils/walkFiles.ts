import { SourceFileModel } from "../models/SourceFile.model";

const fs = require( 'fs' );

export function walkSync( path:string, fileList:SourceFileModel[] = [], basePath:string = path ):SourceFileModel[]{
  let files = fs.readdirSync( path );
  // let basePath = basePath;
  fileList = fileList || [];
  files.forEach(  ( file ) => {
    const filePath = `${path}/${file}`;
    if ( fs.statSync( filePath ).isDirectory() ) {
      fileList = walkSync( filePath, fileList, basePath );
    }
    else {
      const {birthtime, size} = fs.statSync(filePath);
      fileList.push( {path: path.replace(basePath, ''), file, basePath, createdDate:birthtime, fileSize:size} );
    }
  } );

  return fileList;
}
