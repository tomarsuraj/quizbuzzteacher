import React, { useReducer, useContext } from "react";
import { Button, CloseButton, Container, Form } from "react-bootstrap";
import {
  classList,
  initialUploadQuizFormState,
  quizType,
} from "../utility/constanst";
import { userContext } from "../store/store";
import reducer from "../Reducer/UploadQuizReducer";
import {
  ADD_QUIZ_CLASSES,
  REMOVE_QUIZ_CLASSES,
  SET_QUIZ_DEADLINE,
  SET_QUIZ_PER_QUESTION_DURATION,
  SET_QUIZ_TITLE,
  SET_QUIZ_TOTAL_DURATION,
  SET_QUIZ_TYPE,
} from "../actions/uploadQuizAction.type";

const UploadQuiz = () => {
  const { state } = useContext(userContext);
  const [formState, formDispatch] = useReducer(
    reducer,
    initialUploadQuizFormState
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form State", {
      ...formState,
      questionList: state.activeQuiz,
    });
  };

  return (
    <Container className="p-4">
      <h2>Before Uploading Quiz </h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="quizTitle">
          <Form.Label>Title of Quiz</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title of Quiz"
            value={formState.title}
            onChange={(e) =>
              formDispatch({ type: SET_QUIZ_TITLE, payload: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quizEndDate">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            placeholder="Select Date"
            value={formState.deadline}
            onChange={(e) =>
              formDispatch({ type: SET_QUIZ_DEADLINE, payload: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quizQuizDuration">
          <Form.Label>Quiz Total Duration in minutes</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter total Duration of Quiz in  minutes"
            value={formState.totalDuration}
            onChange={(e) =>
              formDispatch({
                type: SET_QUIZ_TOTAL_DURATION,
                payload: e.target.value,
              })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="quizPerQuestionTimer">
          <Form.Label>Per Question timer in minutes</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Per Question timer in minutes"
            value={formState.perQuestionDuration}
            onChange={(e) =>
              formDispatch({
                type: SET_QUIZ_PER_QUESTION_DURATION,
                payload: e.target.value,
              })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="quizType">
          <Form.Label>Quiz Type</Form.Label>
          <Form.Select
            aria-label="Quiz Type"
            className="mb-3"
            value={formState.type}
            onChange={(e) =>
              formDispatch({
                type: SET_QUIZ_TYPE,
                payload: e.target.value,
              })
            }
          >
            <option disabled value="default">
              Select Quiz Type
            </option>
            {quizType.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <div className=" mb-3 w-100 border rounded d-flex">
          {formState.classList.map((value, index) => (
            <div key={index} className="mx-1">
              <p className="mx-3">
                {value}
                <CloseButton
                  onClick={() =>
                    formDispatch({ type: REMOVE_QUIZ_CLASSES, payload: value })
                  }
                />
              </p>
            </div>
          ))}
        </div>
        <Form.Group>
          <Form.Label>Select Class</Form.Label>
          <Form.Select
            aria-label="Select Class"
            className="mb-3"
            value={formState.classSelect}
            onChange={(e) =>
              formDispatch({ type: ADD_QUIZ_CLASSES, payload: e.target.value })
            }
          >
            <option disabled value="default">
              Select Class
            </option>
            {classList.map((value, index) => (
              <option value={value} key={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default UploadQuiz;
