import * as http from "http";
import config from "./config/config";
import { UpdateLibraryService } from "./services/updateLibrary.service";


// Init the express application
// @ts-ignore
console.log('test');

const updateLib = new UpdateLibraryService();
updateLib.importMoviesFromFiles();


const app = require("./config/express").default();

const server: http.Server = http.createServer(app);

server.listen(config.port);

server.on("error", (e : Error) => {

  console.log("Error starting server" + e);
});

server.on("listening", () => {
  console.log("Server started on port " + config.port);
});
