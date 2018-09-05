import { Express } from "express";
import IndexController from "../controllers/index.server.controller";
import TaskController from "../controllers/task.controller";
import { RepoController } from "../controllers/repo.controller";
import { MovieFilesRepo } from "../repositories/movieFiles.repo";

export default class IndexRoute {
	constructor(app: Express) {
		app.route("/")
			.get(IndexController.read);

    app.route("/movie-files")
      .get(new RepoController(new MovieFilesRepo()).handleListRequest);

    app.route("/movie-files/:key")
      .get(new RepoController(new MovieFilesRepo()).handleDetailRequest);

		app.route("/tasks/")
			.get(TaskController.read)
	}
}