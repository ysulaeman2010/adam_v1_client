import { GET_FACE_STATUS } from "./faceTypes";

export const getFaceStatus = (mask, confidence) => {
  return {
    type: GET_FACE_STATUS,
    payload_mask: mask,
    payload_confidence: confidence,
  };
};
