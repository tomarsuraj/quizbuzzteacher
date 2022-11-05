import {
  ADD_CLASS,
  SET_CONFIRMPASSWORD,
  SET_EMAIL,
  SET_NAME,
  SET_PASSWORD,
  REMOVE_CLASS,
} from "../actions/signupAction.type";

export default (state, action) => {
  switch (action.type) {
    case SET_NAME:
      return { ...state, name: action.payload };
    case SET_EMAIL:
      return { ...state, email: action.payload };
    case SET_PASSWORD:
      return { ...state, password: action.payload };
    case SET_CONFIRMPASSWORD:
      return { ...state, confirmPassword: action.payload };
    case ADD_CLASS:
      return {
        ...state,
        classList: [...state.classList, action.payload],
        classSelect: action.payload,
      };
    case REMOVE_CLASS:
      const { classList } = state;
      classList.splice(action.payload, 1);
      return { ...state, classList };

    default:
      return state;
  }
};
