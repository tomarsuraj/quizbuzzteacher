import React, { useReducer, useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
  Toast,
  CloseButton,
} from "react-bootstrap";
import reducer from "../Reducer/signupReducer";
import { handleTeacherSignup } from "../firebase/auth";
import {
  ADD_CLASS,
  REMOVE_CLASS,
  SET_CONFIRMPASSWORD,
  SET_EMAIL,
  SET_NAME,
  SET_PASSWORD,
} from "../actions/signupAction.type";
import { classList, initialSignUpFormState } from "../utility/constanst";

const SignUp = () => {
  const [formState, formDispatch] = useReducer(reducer, initialSignUpFormState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.password === formState.confirmPassword) {
      handleTeacherSignup(formState);
    }
  };

  console.log("formState", formState);

  return (
    <Container className="mt-3">
      <div className="text-center">
        <h3>Sign Up</h3>
        <p>Please Provide Details for Sign up</p>
      </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSignupName">
            <Form.Label>Name</Form.Label>
            <FormControl
              type="text"
              placeholder="Enter Name"
              value={formState.name}
              onChange={(e) =>
                formDispatch({ type: SET_NAME, payload: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formSignupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={formState.email}
              onChange={(e) =>
                formDispatch({ type: SET_EMAIL, payload: e.target.value })
              }
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formSignupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={formState.password}
                  onChange={(e) =>
                    formDispatch({
                      type: SET_PASSWORD,
                      payload: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                className="mb-3"
                controlId="formSignupConfiumPassword"
              >
                <Form.Label>Confium Password</Form.Label>
                <Form.Control
                  name="confiumPassword"
                  type="password"
                  isInvalid={
                    formState.password === formState.confirmPassword
                      ? false
                      : true
                  }
                  placeholder="Confium Password"
                  value={formState.confirmPassword}
                  onChange={(e) =>
                    formDispatch({
                      type: SET_CONFIRMPASSWORD,
                      payload: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <div className=" mb-3 w-100 border rounded d-flex">
            {formState.classList.map((value, index) => (
              <div key={index} className="mx-1">
                <p>
                  {value}
                  <CloseButton
                    onClick={() =>
                      formDispatch({ type: REMOVE_CLASS, payload: index })
                    }
                    className="mx-1 text-danger"
                  />
                </p>
              </div>
            ))}
          </div>
          <Form.Select
            aria-label="Select Class"
            className="mb-3"
            value={formState.classSelect}
            onChange={(e) =>
              formDispatch({ type: ADD_CLASS, payload: e.target.value })
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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignUp;
