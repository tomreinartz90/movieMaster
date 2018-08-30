import { Request, Response } from 'express';
import { UpdateLibraryService } from "../services/updateLibrary.service";

export default class TaskController {
  public static read( req: Request, res: Response, next: Function ): void {
    const updateLib = new UpdateLibraryService();
    let resp: any = { error: "to-task-defined" };
    console.log( req.query );
    if ( req.query && req.query.task ) {
      console.log( req.query.task );
      switch ( req.query.task ) {
        case 'update-movie-files':
          resp = updateLib.indexMovieSources( ["\\\\192.168.1.100\\Multimedia2\\Movies"] );
          break;
        case 'update-series':
          resp = updateLib.indexSeriesSources( ["\\\\192.168.1.100\\Multimedia2\\Series"] );
          break;
        default:
          resp = { error: `task ${req.query.task} is not available` };
          break;
      }
    }
    // updateLib.indexSeriesSources( ["\\\\192.168.1.100\\Multimedia2\\Series"] );
    // updateLib.indexMovieSources( ["\\\\192.168.1.100\\Multimedia2\\Movies"] );
    console.log( resp );
    res.json( resp );
  }

  public static get( req: Request, res: Response ): void {
    res.json( { msg: 'Hello!' } );
    console.log( req );
  }
}