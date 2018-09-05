import { Request, Response } from 'express';
import { UpdateLibraryService } from "../services/updateLibrary.service";
import { Appconfig } from "../config/appconfig";
import { LoggerService } from "../services/logger.service";
import { Observable } from "rxjs";
import { taskManager } from "../services/taskmanager.service";

export default class TaskController {
  public static read( req: Request, res: Response, next: Function ): void {
    if ( req.query && req.query.task ) {
      LoggerService.info( 'taskmngr', req.query.task );
      const taskName = req.query.task;
      switch ( taskName ) {
        case 'update-series':
        case 'update-movie-files':
          //wait at least 30 seconds before a task can run again.
          if ( !taskManager.getLastDispatcedDate( taskName ) || taskManager.getLastDispatcedDate( taskName ).valueOf() - new Date().valueOf() > 30000 )
            taskManager.dispatch( taskName );
          else
            throw Error( `task ${req.query.task} has already ran recently` );
          break;
        default:
          throw Error( `task ${req.query.task} is not available` );
      }
    } else {
      throw Error( "to-task-defined" );
    }
    res.json( { msg: 'added task' } );
  }

  public static get( req: Request, res: Response ): void {
    res.json( { msg: 'Hello!' } );
  }
}