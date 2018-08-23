import { walkSync } from "../utils/walkFiles";
import * as path from "path";
import { getVideoTypeExts } from "../models/videoTypes.enum";
import { MovieFilesRepo } from "../repositories/movieFiles.repo";
import { SeriesFilesRepo } from "../repositories/seriesFiles.repo";

/**
 * service used to check what files are available on the disk and places those files into the library db.
 * used for series and movies.
 */
export class UpdateLibraryService {

  private getMovieFilesForSources(sources:Array<string>){
    let files = [];
    const videoExts = getVideoTypeExts();
    sources.forEach( source => {
      const _files = walkSync( path.resolve( source ) );
      const videoFiles = _files.filter( file => videoExts.some( ext => file.file.endsWith( ext ) ) );
      files = [...files, ...videoFiles];
    } );

    return files;
  }

  /**
   * check all sources that have been defined as movie to see if new files are available and add those
   * new files into the db.
   */
  indexMovieSources( sources: Array<string> = [] ) {
    const repo = new MovieFilesRepo();
    const result = this.getMovieFilesForSources(sources);
    repo.addMany(result);
    return repo.getAll();

  }

  /**
   * check all sources that have been defined as series to see if new episode files are available and
   * add those new files into the db.
   */
  indexSeriesSources(sources: Array<string> = []) {
    const repo = new SeriesFilesRepo();
    // const result = this.getMovieFilesForSources(sources);
    // repo.addMany(result);
    return repo.getAllGrouped();
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