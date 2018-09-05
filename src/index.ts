import * as http from "http";
import config from "./config/config";
import { taskManager } from "./services/taskmanager.service";
// Init the express application
// @ts-ignore

const app = require( "./config/express" ).default();

const server: http.Server = http.createServer( app );

server.listen( config.port );
taskManager.dispatch( 'start' );

server.on( "error", ( e: Error ) => {
  console.log( "Error starting server" + e );
} );

server.on( "listening", () => {
  console.log( "Server started on port " + config.port );
} );
