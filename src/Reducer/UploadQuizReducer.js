import {
  ADD_QUIZ_CLASSES,
  REMOVE_QUIZ_CLASSES,
  SET_QUIZ_DEADLINE,
  SET_QUIZ_PER_QUESTION_DURATION,
  SET_QUIZ_TITLE,
  SET_QUIZ_TOTAL_DURATION,
  SET_QUIZ_TYPE,
} from "../actions/uploadQuizAction.type";

export default (state, action) => {
  switch (action.type) {
    case SET_QUIZ_TITLE:
      return { ...state, title: action.payload };
    case SET_QUIZ_DEADLINE:
      return { ...state, deadline: action.payload };
    case SET_QUIZ_TOTAL_DURATION:
      return { ...state, totalDuration: action.payload };
    case SET_QUIZ_PER_QUESTION_DURATION:
      return { ...state, perQuestionDuration: action.payload };
    case SET_QUIZ_TYPE:
      return { ...state, quizType: action.payload };
    case ADD_QUIZ_CLASSES:
      const val = state.classList.indexOf(action.payload);
      if (val !== -1) return state;
      console.log("cc", val);
      return {
        ...state,
        classList: [...state.classList, action.payload],
        classSelect: action.payload,
      };

    case REMOVE_QUIZ_CLASSES:
      const classList = state.classList.filter(
        (class1) => class1 != action.payload
      );
      return { ...state, classList };

    default:
      return state;
  }
};
