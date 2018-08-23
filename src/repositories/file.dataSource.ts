import * as fs from "fs";

export class FileDataSource {
  private static getFileName( repo ) {
    return `db/${repo}.json`;
  }

  /**
   * load the stored state from source
   */
  static loadDataFromSource( repo: string ) {
    // @ts-ignore
    const fileData = fs.readFileSync( this.getFileName( repo ), 'utf8' );
    if ( fileData ) {
      return JSON.parse( fileData );
    }
  }

  /**
   * store the current stete into the dataSource
   */
  static storeDataToSource( repo: string, data: any ) {
    // @ts-ignore
    console.log( `[update repo] - [${repo}]` );
    fs.writeFileSync( this.getFileName( repo ), JSON.stringify( data, null, 2 ) );
  }
}