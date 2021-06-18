import { GET_CAMERA_IMAGE, RESET_CAMERA_IMAGE } from "./cameraTypes";

export const getCameraData = (data) => {
  return {
    type: GET_CAMERA_IMAGE,
    payload: data,
  };
};

export const resetCameraData = () => {
  return {
    type: RESET_CAMERA_IMAGE,
  };
};
