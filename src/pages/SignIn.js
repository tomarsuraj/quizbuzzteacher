import React, { useReducer, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  FormControl,
} from 'react-bootstrap';
import { signinFirebase } from '../firebase/auth';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    signinFirebase(email, password);
  };
  return (
    <Container className="mt-3">
      <div className="text-center">
        <h3>Sign In</h3>
        <p>Please Provide Details for Sign IN</p>
      </div>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formSignInEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSignInPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignIn;
