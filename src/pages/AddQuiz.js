import React, { useContext, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { DELETE_QUESTION_FROM_ACTIVE_QUIZ } from "../actions/appAction.type";
import AddQuizForm from "../Components/AddQuizForm";
import ReadXlsx from "../Components/ReadXlsx";
import { userContext } from "../store/store";
import { Link } from "react-router-dom";

const AddQuiz = () => {
  const { state, dispatch } = useContext(userContext);
  const [showAddQuizForm, setShowAddQuizForm] = useState(false);
  const [editFormData, setEditFormData] = useState({});

  const handleEdit = (index) => {
    setEditFormData({
      question: state.activeQuiz[index][0],
      optionA: state.activeQuiz[index][1],
      optionB: state.activeQuiz[index][2],
      optionC: state.activeQuiz[index][3],
      optionD: state.activeQuiz[index][4],
      answer: state.activeQuiz[index][5],
      isEdit: true,
      index: index,
    });
    setShowAddQuizForm(true);
  };
  const handleNewQuestion = () => {
    setEditFormData({
      isEdit: false,
    });
    setShowAddQuizForm(true);
  };

  const handleDelete = (key) => {
    dispatch({ type: DELETE_QUESTION_FROM_ACTIVE_QUIZ, payload: key });
  };

  console.log("state", state);
  return (
    <Container>
      <Row>
        <Col>
          <ReadXlsx />
        </Col>
        <Col>
          <Button onClick={handleNewQuestion}>Add New Question</Button>
        </Col>
        <Col>
          <Button as={Link} to="/uploadquiz">
            Upload Quiz
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Question</th>
            <th>Option A</th>
            <th>Option B</th>
            <th>Option C</th>
            <th>Option D</th>
            <th>Option Answer</th>
            <th>#</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state?.activeQuiz).map(([key, value]) => (
            <tr key={key}>
              <td>{value[0]}</td>
              <td>{value[1]}</td>
              <td>{value[2]}</td>
              <td>{value[3]}</td>
              <td>{value[4]}</td>
              <td>{value[5]}</td>
              <td className="text-center">
                <Button className="m-1" onClick={() => handleEdit(key)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  className="m-1"
                  onClick={() => handleDelete(key)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddQuizForm
        data={editFormData}
        showAddQuizForm={showAddQuizForm}
        setShowAddQuizForm={setShowAddQuizForm}
        isEdit={editFormData?.isEdit}
      />
    </Container>
  );
};

export default AddQuiz;
