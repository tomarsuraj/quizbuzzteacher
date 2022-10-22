import React, { useReducer, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
  Toast,
} from 'react-bootstrap';
import { handleTeacherSignup } from '../firebase/auth';

const classList = ['MCA', 'BCA', 'MBA', 'M.Com', 'B.Com'];
const initialFormState = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  classList: [],
  classSelect: 'default',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'name':
      return { ...state, name: action.payload };
    case 'email':
      return { ...state, email: action.payload };

    case 'password':
      return { ...state, password: action.payload };
    case 'confirmPassword':
      return { ...state, confirmPassword: action.payload };
    case 'addClass':
      return {
        ...state,
        classList: [...state.classList, action.payload],
        classSelect: action.payload,
      };
    case 'removeClass':
      const { classList } = state;
      classList.splice(action.payload, 1);
      return { ...state, classList };

    default:
      return state;
  }
};

const SignUp = () => {
  const [formState, formDispatch] = useReducer(reducer, initialFormState);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.password === formState.confirmPassword) {
      handleTeacherSignup(formState);
    }
  };

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
                formDispatch({ type: 'name', payload: e.target.value })
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
                formDispatch({ type: 'email', payload: e.target.value })
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
                    formDispatch({ type: 'password', payload: e.target.value })
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
                      type: 'confirmPassword',
                      payload: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <div className=" mb-3 w-100 border d-flex">
            {formState.classList.map((value, index) => (
              <div key={index} className="mx-1">
                <p>
                  {value}
                  <span
                    onClick={() =>
                      formDispatch({ type: 'removeClass', payload: index })
                    }
                    className="mx-1"
                  >
                    X
                  </span>
                </p>
              </div>
            ))}
          </div>
          <Form.Select
            aria-label="Select Class"
            className="mb-3"
            value={formState.classSelect}
            onChange={(e) =>
              formDispatch({ type: 'addClass', payload: e.target.value })
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
