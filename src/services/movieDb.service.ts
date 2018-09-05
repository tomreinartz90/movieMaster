import { Observable, combineLatest } from "rxjs"; // = require("rxjs")
import { ajax } from "rxjs/ajax"; // = require("rxjs/ajax")
import { map } from "rxjs/operators";
import { LoggerService } from "./logger.service";

// @ts-ignore
global.XMLHttpRequest = require( "xhr2" );

export class MovieDbService {

  private static readonly apiKey = "ffbd2b663d53a66c2dd00bb517491490";
  private static readonly baseUrl = "https://api.themoviedb.org/3/";

  static getMovieDetails( title, year ) {
    LoggerService.verbose( 'MovieDbService', `get movie details for ${title}, ${year}`);
    return ajax( {
      url: `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`,
      method: 'GET'
    } ).pipe( map( res => {
      LoggerService.verbose('MovieDbService', `recieved response for ${title}, ${year}`);
      if ( res && res.response ) {
        return res.response;

      }
      return null;
    } ) );
  }
}