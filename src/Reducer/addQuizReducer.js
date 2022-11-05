import {
  SET_ANSWER,
  SET_FORM_DATA,
  SET_OPTIONA,
  SET_OPTIONB,
  SET_OPTIONC,
  SET_OPTIOND,
  SET_QUESTION,
  TOGGLE_ISEDIT,
} from "../actions/addQuizAction.type";

export default (state, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return { ...state, question: action.payload };
    case SET_OPTIONA:
      return { ...state, optionA: action.payload };
    case SET_OPTIONB:
      return { ...state, optionB: action.payload };
    case SET_OPTIONC:
      return { ...state, optionC: action.payload };
    case SET_OPTIOND:
      return { ...state, optionD: action.payload };
    case SET_ANSWER:
      return { ...state, answer: action.payload };
    case TOGGLE_ISEDIT:
      return { ...state, isEdit: !state.isEdit };
    case SET_FORM_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
