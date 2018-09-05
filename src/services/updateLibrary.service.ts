import { flatten, walk$, walkSync } from "../utils/walkFiles";
import * as path from "path";
import { getVideoTypeExts } from "../models/videoTypes.enum";
import { MovieFilesRepo } from "../repositories/movieFiles.repo";
import { SeriesFilesRepo } from "../repositories/seriesFiles.repo";
import { combineLatest, Observable, of } from "rxjs";
import { MovieDbService } from "./movieDb.service";
import { MovieParser } from "../parsers/movie.parser";
import { delay, map, mergeMap, tap } from "rxjs/operators";
import { Appconfig } from "../config/appconfig";
import { SourceFileModel } from "../models/SourceFile.model";
import { LoggerService } from "./logger.service";

/**
 * service used to check what files are available on the disk and places those files into the library db.
 * used for series and movies.
 */
export class UpdateLibraryService {

  private getMovieFilesForSources( sources: Array<string> ): Observable<Array<SourceFileModel>> {
    const videoExts = getVideoTypeExts();
    return combineLatest( sources.map( source => {
        return walk$( path.resolve( source ) )
          .pipe(
            map( files => files
              .filter( file =>
                videoExts.some( ext => file.file.endsWith( ext ) )
              )
            )
          );
      } )
    ).pipe(
      map( files => flatten( files ) )
    );
  }

  importMoviesFromFiles(): Observable<Array<any>> {
    const repo = new MovieFilesRepo();
    const movies = repo.getAll();

    return combineLatest(
      movies
        .filter( info => info.fileSize > Appconfig.minFilesize )
        .map( movie => MovieParser.parseMovieTitle( movie.file ) )
        .filter( info => !!info )//filter out items that cannot be parsed
        .map( ( info, index ) =>
          of( null ).pipe(
            delay( 500 * (index + 1) ),
            mergeMap( () => MovieDbService.getMovieDetails( info.title, info.year ) )
          ) )
    );
  }

  /**
   * check all sources that have been defined as movie to see if new files are available and add those
   * new files into the db.
   */
  indexMovieSources(): Observable<Array<SourceFileModel>> {
    const repo = new MovieFilesRepo();
    LoggerService.verbose( 'UpdateLibraryService', 'index movie sources started' );
    return this.getMovieFilesForSources( Appconfig.movieFileLocations )
      .pipe(
        tap( result => repo.addMany( result ) ),
        tap( result => LoggerService.verbose( 'UpdateLibraryService', `index movie sources completed, found ${result.length} files` ) ),
        map( () => repo.getAll() )
      );
  }

  /**
   * check all sources that have been defined as series to see if new episode files are available and
   * add those new files into the db.
   */
  indexSeriesSources( sources: Array<string> = [] ) {
    const repo = new SeriesFilesRepo();
    // const result = this.getMovieFilesForSources(sources);
    // repo.addMany(result);
    return of( repo.getAllGrouped() );
  }

  /**
   * get all information related to the movie in the db.
   */
  getMovieDetailsForMovieFile() {

  }

  /**
   * get all information related to the episode in the db.
   */
  getEpisodeDetailsForEpisodeFile() {

  }

}