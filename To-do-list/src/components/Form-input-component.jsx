import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';

function JobForm({ appData, setCardData, editData, setEditData }) {
  const [addTodoName, setTodoName] = useState("");
  const [addTodoDescription, setTodoDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  useEffect(() => {
    if (editData) {
      setTodoName(editData.addTodoName);
      setTodoDescription(editData.addTodoDescription);
    }
  }, [editData]);


  const handleSubmit = (e) => {
    e.preventDefault();

    setNameError("");
    setDescriptionError("");

    let isValid = true;

    if (addTodoName.trim() === "") {
      setNameError("Todo Name is required.");
      isValid = false;
    }

    if (addTodoDescription.trim() === "") {
      setDescriptionError("Todo Description is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    if(editData){
      const updateData = appData.map(item => item.id === editData.id ? {...item, addTodoName, addTodoDescription} : item)
      setCardData(updateData);
      setEditData(null)
    }
    else{
      const data = {
        id:appData.length + 1,
        addTodoName,
        addTodoDescription,
        status: 'Not Selected'
      };
      setCardData(prevData => [...prevData, data]);
      setTodoName('');
      setTodoDescription('');
    }
    
  }

  return (
    <>
      <section>
        <div className="container">
          <h4 className="text-center text-color">My ToDo</h4>
          <div className="row">
            <div className="col-md-10 offset-md-2">
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="align-items-center">
                  <Col>
                    <Form.Group controlId="formTodoName">
                      <Form.Control
                        placeholder="Todo Name"
                        value={addTodoName}
                        onChange={(e) => setTodoName(e.target.value)}
                        isInvalid={!!nameError}
                      />
                      <Form.Control.Feedback type="invalid">
                        {nameError}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formTodoDescription">
                      <Form.Control
                        placeholder="Todo Description"
                        value={addTodoDescription}
                        onChange={(e) => setTodoDescription(e.target.value)}
                        isInvalid={!!descriptionError}
                      />
                      <Form.Control.Feedback type="invalid">
                        {descriptionError}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button variant="success" className="buttonSizing" type="submit">
                      {editData ? 'Update ToDo' : 'Add ToDo'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default JobForm;