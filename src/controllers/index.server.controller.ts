import { Request, Response } from 'express';
import { UpdateLibraryService } from "../services/updateLibrary.service";

export default class IndexController {
  public static read( req: Request, res: Response, next: Function ): void {
    const updateLib = new UpdateLibraryService();
    // updateLib.indexSeriesSources( ["\\\\192.168.1.100\\Multimedia2\\Series"] );
    // updateLib.indexMovieSources( ["\\\\192.168.1.100\\Multimedia2\\Movies"] );
    res.render( 'index', { title: 'Express' } );
    console.log(req);
  }

  public static get( req: Request, res: Response ): void {
    res.json( { msg: 'Hello!' } );
    console.log(req);
  }
}