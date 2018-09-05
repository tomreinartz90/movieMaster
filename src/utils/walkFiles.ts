import { SourceFileModel } from "../models/SourceFile.model";
import { Observable, of } from "rxjs";

const fs = require( 'fs' );

export function walkSync( path: string, fileList: SourceFileModel[] = [], basePath: string = path ): SourceFileModel[] {
  let files = fs.readdirSync( path );
  // let basePath = basePath;
  fileList = fileList || [];
  files.forEach( ( file ) => {
    const filePath = `${path}/${file}`;
    if ( fs.statSync( filePath ).isDirectory() ) {
      fileList = walkSync( filePath, fileList, basePath );
    }
    else {
      const { birthtime, size } = fs.statSync( filePath );
      const uuid = Buffer.from( `${size}${file}` ).toString( 'base64' );

      fileList.push( {
        path: path.replace( basePath, '' ),
        file,
        basePath,
        createdDate: birthtime,
        fileSize: size,
        uuid
      } );
    }
  } );

  return fileList;
}

export function walk$( path: string ): Observable<Array<SourceFileModel>> {
  return of( walkSync( path ) );
}

export const flatten = list => list.reduce(
  ( a, b ) => a.concat( Array.isArray( b ) ? flatten( b ) : b ), []
);
