import { FileDataSource } from "./file.dataSource";

const fs = require( 'fs' );


/**
 * helper class used to manage data related to a repo
 */
export abstract class BaseRepo<T> {

  /**
   * container holding the current state of the repo
   */
  private state: { [key: string]: T } = {};

  private get repoName(): string {
    return this.constructor.name;
  }

  constructor() {
    this.state = FileDataSource.loadDataFromSource( this.repoName );
  }


  /**
   * return all items in the repo
   */
  getAll(): T[] {
    return Object.keys( this.state ).map( key => (this.state[key]) );
  }

  /**
   * return a single item in the repo
   */
  getByKey( key ): T {
    return this.state[key];
  }

  /**
   * update a single item in the repo
   */
  updateByKey( obj: T ) {
    this.state[this.getKey( obj )] = obj;
    FileDataSource.storeDataToSource( this.repoName, this.state );
  }

  /**
   * delete a item in the repo
   */
  deleteByKey( key ) {
    delete this.state[key];
    FileDataSource.storeDataToSource( this.repoName, this.state );
  }

  /**
   * add an item to the repo
   */
  add( obj: T ) {
    const key = this.getKey( obj );
    if ( !this.state[key] ) {
      this.state[key] = obj;
      FileDataSource.storeDataToSource( this.repoName, this.state );
    } else {
      this.updateByKey( obj );
    }
  }

  addMany( objects: T[] ) {
    objects.forEach( obj => {
      this.state[this.getKey( obj )] = obj;
    } );
    FileDataSource.storeDataToSource( this.repoName, this.state );
  }

  /**
   * return the unique prop or combination of props that can be used to store this object.
   * @param obj
   */
  public abstract getKey( obj: T ): string;


}