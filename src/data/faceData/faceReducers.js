import { GET_FACE_STATUS } from "./faceTypes";

const initialState = {
  mask_status: "",
  confidence_level: 0,
};

const faceReducers = (state = initialState, action) => {
  switch (action.type) {
    case GET_FACE_STATUS:
      return {
        ...state,
        mask_status: action.payload_mask,
        confidence_level: action.payload_confidence,
      };

    default:
      return state;
  }
};

export default faceReducers;
