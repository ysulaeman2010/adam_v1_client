import {
  DELETE_FACE_STATUS,
  ERROR_GET_FACE_STATUS,
  GET_FACE_STATUS,
} from "./faceTypes";

export const getFaceStatus = (mask, confidence) => {
  return {
    type: GET_FACE_STATUS,
    payload_mask: mask,
    payload_confidence: confidence,
  };
};

export const deleteFaceStatus = () => {
  return {
    type: DELETE_FACE_STATUS,
  };
};

export const errorGetFaceStatus = (data) => {
  return {
    type: ERROR_GET_FACE_STATUS,
    payload: data,
  };
};

export const setFaceStatus = (mask, confidence) => {
  return (dispatch) => {
    dispatch(getFaceStatus(mask, confidence));
  };
};
