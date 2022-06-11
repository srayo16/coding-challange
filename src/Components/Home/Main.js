import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const Main = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <div className='container mt-5'>
                <h1 className='text-center fw-bolder' style={{ color: 'orange' }}>Check your Work Board</h1>
                <div className='row gx-5 gy-5'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4'>
                        <Dropdown as={ButtonGroup}>
                            <Button variant="success" className='ps-5 pe-4'>TO DO</Button>

                            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                            <Dropdown.Menu className='text-center rounded p-0'>
                                <Dropdown.Item onClick={handleShow}>New Task</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="task title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Add Task
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Main;