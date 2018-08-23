import * as path from "path";
import { walkSync } from "../utils/walkFiles";
import { getVideoTypeExts } from "../models/videoTypes.enum";
const fs = require('fs');

export default class SourcesController {
  private path = "\\\\192.168.1.100\\Multimedia2\\Movies";
  constructor(){
    console.log('starting up sourcesController');
    const files = walkSync(path.resolve(this.path));
    const videoExts = getVideoTypeExts();
    const videoFiles = files.filter(file => videoExts.some(ext => file.file.endsWith(ext)));
    console.log(videoFiles);
  }
}