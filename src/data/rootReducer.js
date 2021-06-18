import { combineReducers } from "redux";
import cameraReducers from "./cameraData/cameraReducers";
import faceReducers from "./faceData/faceReducers";

const rootReducer = combineReducers({
  camera: cameraReducers,
  face: faceReducers,
});

export default rootReducer;
