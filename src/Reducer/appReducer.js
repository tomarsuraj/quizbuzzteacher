import {
  SET_ACTIVE_QUIZ,
  ADD_QUESTION_TO_ACTIVE_QUIZ,
  EDIT_QUESTION_OF_ACTIVE_QUIZ,
  DELETE_QUESTION_FROM_ACTIVE_QUIZ,
} from "../actions/appAction.type";

export default (state, action) => {
  switch (action.type) {
    case SET_ACTIVE_QUIZ:
      return { ...state, activeQuiz: action.payload };
    case EDIT_QUESTION_OF_ACTIVE_QUIZ: {
      const { activeQuiz } = state;
      const { quiz, index } = action.payload;
      activeQuiz[index] = [
        quiz.question,
        quiz.optionA,
        quiz.optionB,
        quiz.optionC,
        quiz.optionD,
        quiz.answer,
      ];
      return { ...state, activeQuiz };
    }
    case ADD_QUESTION_TO_ACTIVE_QUIZ: {
      const activeQuiz = state.activeQuiz;
      activeQuiz[action.payload.id] = [
        action.payload.formState.question,
        action.payload.formState.optionA,
        action.payload.formState.optionB,
        action.payload.formState.optionC,
        action.payload.formState.optionD,
        action.payload.formState.answer,
      ];
      return { ...state, activeQuiz };
    }
    case DELETE_QUESTION_FROM_ACTIVE_QUIZ: {
      const { activeQuiz } = state;

      delete activeQuiz[action.payload];

      return { ...state, activeQuiz };
    }
    default:
      return state;
  }
};
