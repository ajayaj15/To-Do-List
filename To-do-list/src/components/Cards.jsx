import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Cards({ data, setCardData, setEditData }) {
  const [statusFilter, setFilter] = useState("All");
  
  const handleDelete = (id) => {
    const deleteData = data.filter((item) => {
      return item.id !== id;
    });
    setCardData(deleteData);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredData = data.filter((item) => {
    if (statusFilter === "All") {
      return true;
    } else {
      return item.status === statusFilter;
    }
  });
  
  const handleEdit = (item) => {
    setEditData(item);
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <p>MyTodo</p>
        </div>

        <div className="col-md-6">
          <Row>
            <Form.Label column="sm" lg={2}>
              Status Filter
            </Form.Label>
            <Col>
              <Form.Select
                aria-label="Default select example"
                className="custom-select-width-filter custom-select-background"
                onChange={handleFilterChange}
              >
                <option value="All">All</option>
                <option value="Not Selected">Not Selected</option>
                <option value="Selected">Selected</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </div>
      <div className="row">
        {filteredData.length ? (
          filteredData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card card-background mb-4 mt-4">
                <div className="card-body">
                  <p className="card-title">Name : {item.addTodoName}</p>
                  <p className="card-text">
                    Description : {item.addTodoDescription}
                  </p>
                  <Row>
                    <Form.Label column="sm" lg={2}>
                      Status
                    </Form.Label>
                    <Col>
                      <Form.Select
                        aria-label="Default select example"
                        className="custom-select-width custom-select-background"
                        onChange={(e) => {
                          const updatedStatus = e.target.value;
                          setCardData((prevData) =>
                            prevData.map((todo) =>
                              todo.id === item.id
                                ? { ...todo, status: updatedStatus }
                                : todo
                            )
                          );
                        }}
                      >
                        <option value="Not Selected">Not Selected</option>
                        <option value="Selected">Selected</option>
                      </Form.Select>
                    </Col>
                  </Row>
                  <div className="float-end">
                    <Button
                      variant="primary m-2 editButton"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary deleteButton"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-center text-color">Add a To-Do</h1>
        )}
      </div>
    </div>
  );
}

export default Cards;