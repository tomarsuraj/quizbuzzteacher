import React, { useState, useEffect, useReducer, useContext } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { userContext } from "../store/store";
import reducer from "../Reducer/addQuizReducer";
import {
  SET_ANSWER,
  SET_FORM_DATA,
  SET_OPTIONA,
  SET_OPTIONB,
  SET_OPTIONC,
  SET_OPTIOND,
  SET_QUESTION,
} from "../actions/addQuizAction.type";
import {
  ADD_QUESTION_TO_ACTIVE_QUIZ,
  EDIT_QUESTION_OF_ACTIVE_QUIZ,
} from "../actions/appAction.type";
import { nanoid } from "nanoid";
import { initialAddQuizFormState } from "../utility/constanst";

const AddQuizForm = ({
  data,
  showAddQuizForm,
  setShowAddQuizForm,
  isEdit = false,
}) => {
  const { state, dispatch } = useContext(userContext);
  const [formState, formdispatch] = useReducer(
    reducer,
    initialAddQuizFormState
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      console.log("ISEDIT");
      dispatch({
        type: EDIT_QUESTION_OF_ACTIVE_QUIZ,
        payload: { index: data.index, quiz: formState },
      });
      formdispatch({ type: SET_FORM_DATA, payload: initialAddQuizFormState });
      setShowAddQuizForm(false);
    } else {
      dispatch({
        type: ADD_QUESTION_TO_ACTIVE_QUIZ,
        payload: { formState, id: nanoid() },
      });
    }
  };

  useEffect(() => {
    if (isEdit) {
      formdispatch({ type: SET_FORM_DATA, payload: data });
    }
  }, [isEdit, data]);

  return (
    <Modal
      show={showAddQuizForm}
      size="xl"
      onHide={() => setShowAddQuizForm(false)}
    >
      <Form className="m-3" onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            name="question"
            value={formState.question}
            onChange={(e) =>
              formdispatch({ type: SET_QUESTION, payload: e.target.value })
            }
            type="text"
            placeholder="Question"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Option A</Form.Label>
          <Form.Control
            as="textarea"
            name="optionA"
            value={formState.optionA}
            onChange={(e) =>
              formdispatch({ type: SET_OPTIONA, payload: e.target.value })
            }
            type="text"
            placeholder="Option A"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Option B</Form.Label>
          <Form.Control
            as="textarea"
            name="optionB"
            value={formState.optionB}
            onChange={(e) =>
              formdispatch({ type: SET_OPTIONB, payload: e.target.value })
            }
            type="text"
            placeholder="Option B"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Option C</Form.Label>
          <Form.Control
            as="textarea"
            name="optionC"
            value={formState.optionC}
            onChange={(e) =>
              formdispatch({ type: SET_OPTIONC, payload: e.target.value })
            }
            type="text"
            placeholder="Option C"
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Option D</Form.Label>
          <Form.Control
            as="textarea"
            name="optionD"
            onChange={(e) =>
              formdispatch({ type: SET_OPTIOND, payload: e.target.value })
            }
            value={formState.optionD}
            type="text"
            placeholder="Option D"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Answer</Form.Label>
          <Form.Control
            as="select"
            value={formState.answer}
            onChange={(e) =>
              formdispatch({ type: SET_ANSWER, payload: e.target.value })
            }
            name="question"
            type="text"
            placeholder="Answer"
          >
            <option disabled value="default">
              Choose Answer
            </option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </Form.Control>
        </Form.Group>

        <Button type="submit">{isEdit ? "Edit" : "Add"}</Button>
      </Form>
    </Modal>
  );
};

export default AddQuizForm;
