import { createLogger, format, Logger, transports } from "winston";
import * as colors from "colors";

export class LoggerService {
  private static logger: Logger;


  private static formatString = format.printf( ( info ) => {
    const msg = `[${info.level}] [${info.timestamp}] [${info.message}]`;
    switch ( info.level ) {
      case('error'):
        return colors.red( msg );
      case('warn'):
        return colors.yellow( msg );
      case('info'):
        return colors.blue( msg );
      case('verbose'):
        return colors.gray( msg );
      case('debug'):
        return colors.green( msg );
      case('sill'):
        return colors.cyan( msg );

      default :
        return msg;
    }
  } );

  private static createLogger() {
    LoggerService.logger = createLogger( {
      level: 'silly',
      transports: [
        new transports.Console(),
        new transports.File( { filename: 'combined.log' } )
      ],
      format: format.combine(
        format.splat(),
        format.simple(),
        format.timestamp(),
        LoggerService.formatString
      )
    } );

  }

  private static get log(): Logger {
    if ( !this.logger ) {
      this.createLogger();
    }
    return this.logger;
  }

  private static getMsg( task, msg ) {
    return `( ${task} ) ${msg}`;
  }

  static expressJsLogger = {
    write: ( message, encoding ) => {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      LoggerService.info( 'expess', message );
    }
  };

  static error( task, err: string ) {
    this.log.error( this.getMsg( task, err ) );
  }

  static warn( task, warn: string ) {
    this.log.warn( this.getMsg( task, warn ) );
  }

  static info( task, msg: string ) {
    this.log.info( this.getMsg( task, msg ) );
  }

  static verbose( task, msg: string ) {
    console.log( msg );
    this.log.verbose( this.getMsg( task, msg ) );
  }

  static debug( task, msg: string ) {
    this.log.debug( this.getMsg( task, msg ) );
  }


}