import { GET_CAMERA_IMAGE, RESET_CAMERA_IMAGE } from "./cameraTypes";

const initialState = {
  imageURL: "",
  status: false,
};

const cameraReducers = (state = initialState, action) => {
  switch (action) {
    case GET_CAMERA_IMAGE:
      return {
        ...state,
        imageURL: action.payload,
        status: true,
      };

    case RESET_CAMERA_IMAGE:
      return {
        ...state,
        imageURL: "",
        status: false,
      };

    default:
      return state;
  }
};

export default cameraReducers;
