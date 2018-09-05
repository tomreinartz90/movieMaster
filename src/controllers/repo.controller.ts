import { BaseRepo } from "../repositories/base.repo";
import { Request, Response } from "express";

export class RepoController {
  repo: BaseRepo<any>;

  constructor( repo: BaseRepo<any> ) {
    this.repo = repo;
  }

  handleListRequest = ( req: Request, res: Response ) => {
    if ( req.method === 'GET' ) {
      return res.json( this.repo.getAll() );
    }

    if ( req.method === 'POST' ) {
      res.json( this.repo.add( req.body ) );
    }
    else
      throw new Error( "Request method is not supported" );

  };

  handleDetailRequest = ( req: Request, res: Response ) => {
    const key = req.params.key;
    const body = req.body;
    if ( key && this.repo.getByKey( key ) ) {
      let resp = {};
      if ( req.method === 'GET' ) {
        console.log( this.repo.getByKey( key ) );
        resp = res.json( this.repo.getByKey( key ) );
      }

      if ( req.method === 'PUT' ) {
        resp = this.repo.updateByKey( body );
      }

      if ( req.method === 'DELETE' ) {
        resp = {};
      }

      res.json( resp );

    } else
      throw new Error( "Key is not available in: " + this.repo.constructor.name );

  };
}