import { Express } from "express";
import IndexController from "../controllers/index.server.controller";
import TaskController from "../controllers/task.controller";

export default class IndexRoute {
	constructor(app: Express) {
		app.route("/")
			.get(IndexController.read);

		app.route("/tasks/")
			.get(TaskController.read)
	}
}