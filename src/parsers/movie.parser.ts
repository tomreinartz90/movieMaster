export class MovieParser {
  static movieTitleAndYearRegexp = /(.+?)((19|20)\d{2}(?!p|i|(19|20)\d{2}|\]|\W(19|20)\d{2}))/;


  static parseMovieTitle( title ): { title: string, year: string } {
    const result = this.movieTitleAndYearRegexp.exec( title );
    if ( result ) {
      const [ ig, title, year ]= result;
      console.log(title.replace( /\./g, ' ' ), year);
      return { title: title.replace( /\./g, ' ' ), year };
    }
  }
}