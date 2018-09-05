import { BehaviorSubject, Observable } from "rxjs";
import { LoggerService } from "./logger.service";
import { UpdateLibraryService } from "./updateLibrary.service";
import { filter } from "rxjs/operators";

class TaskmanagerService {
  taskManager = new BehaviorSubject( null );
  private libService: UpdateLibraryService;
  private taskRunTimes = {};


  constructor() {
    this.subscribe( ( task ) => this.taskHandler( task ) );
    this.libService = new UpdateLibraryService();
  }

  dispatch( taskName: string, payload?: any ) {
    setTimeout( () => {
      LoggerService.info( 'Taskmanager', 'new task ' + taskName );
      this.taskManager.next( { taskName, payload } );
      this.taskRunTimes[taskName] = new Date();
    }, 1 );
  }

  getLastDispatcedDate( taskName: string ): Date {
    return this.taskRunTimes[taskName];
  }

  subscribe( nextFn, errFn = ( msg ) => {} ) {
    return this.taskManager
      .pipe(
        filter( i => !!i )
      )
      .subscribe( nextFn, ( err ) => {
        errFn( err );
        LoggerService.error( 'Taskmanager', err );
      } );
  }

  private taskHandler( task: { taskName: string, payload: any } ) {
    LoggerService.info( 'Taskmanager', 'starting: ' + task.taskName );
    let task$: Observable<any> = null;
    switch ( task.taskName ) {
      case 'update-movie-files':
        task$ = this.libService.indexMovieSources();
    }
    if ( task$ ) {
      task$.subscribe( result => {
        LoggerService.info( 'Taskmanager', 'completed: ' + task.taskName );
      } );
    }


  }

}

export const taskManager = new TaskmanagerService();