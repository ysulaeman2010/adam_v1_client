import {
  DELETE_FACE_STATUS,
  ERROR_GET_FACE_STATUS,
  GET_FACE_STATUS,
} from "./faceTypes";

const initialState = {
  mask_status: "",
  confidence_level: 0,
  status: false,
  error: "",
};

const faceReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_FACE_STATUS:
      return {
        ...state,
        mask_status: action.payload_mask,
        confidence_level: action.payload_confidence,
        status: true,
        error: "",
      };

    case DELETE_FACE_STATUS:
      return {
        mask_status: "Loading data",
        confidence_level: 0,
        status: false,
        error: "",
      };

    case ERROR_GET_FACE_STATUS:
      return {
        mask_status: "Loading data",
        confidence_level: 0,
        status: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default faceReducers;
