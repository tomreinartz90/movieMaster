import {Source} from "./Source.enum"

export const videoTypes = {
//Unknown
    ".webm" : Source.UNKNOWN,
//SDTV
".m4v" : Source.TV ,
  ".3gp" : Source.TV ,
  ".nsv" : Source.TV ,
  ".ty" : Source.TV ,
  ".strm" : Source.TV ,
  ".rm" : Source.TV ,
  ".rmvb" : Source.TV ,
  ".m3u" : Source.TV ,
  ".ifo" : Source.TV ,
  ".mov" : Source.TV ,
  ".qt" : Source.TV ,
  ".divx" : Source.TV ,
  ".xvid" : Source.TV ,
  ".bivx" : Source.TV ,
  ".nrg" : Source.TV ,
  ".pva" : Source.TV ,
  ".wmv" : Source.TV ,
  ".asf" : Source.TV ,
  ".asx" : Source.TV ,
  ".ogm" : Source.TV ,
  ".ogv" : Source.TV ,
  ".m2v" : Source.TV ,
  ".avi" : Source.TV ,
  ".bin" : Source.TV ,
  ".dat" : Source.TV ,
  ".dvr-ms" : Source.TV ,
  ".mpg" : Source.TV ,
  ".mpeg" : Source.TV ,
  ".mp4" : Source.TV ,
  ".avc" : Source.TV ,
  ".vp3" : Source.TV ,
  ".svq3" : Source.TV ,
  ".nuv" : Source.TV ,
  ".viv" : Source.TV ,
  ".dv" : Source.TV ,
  ".fli" : Source.TV ,
  ".flv" : Source.TV ,
  ".wpl" : Source.TV ,

//DVD
  ".img" : Source.DVD ,
  ".iso" : Source.DVD ,
  ".vob" : Source.DVD ,

//HD
  ".mkv" : Source.WEBDL ,
  ".ts" : Source.TV ,
  ".wtv" : Source.TV ,

//Bluray
  ".m2ts" : Source.BLURAY
};

export const getVideoTypeExts = () => {
    return Object.keys(videoTypes);
};