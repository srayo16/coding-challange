import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading';

const Main = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { isLoading, error, data: tasks, refetch } = useQuery('repoTask', () =>
        fetch('http://localhost:5000/todo').then(res =>
            res.json()
        )
    )

    if (isLoading) return <Loading></Loading>

    if (error) return 'An error has occurred: ' + error.message
    console.log(tasks);

    const getData = e => {
        e.preventDefault();

        const title = e.target.title.value;
        const description = e.target.descrip.value;
        const data = { title, description };
        // console.log(data);
        fetch('http://localhost:5000/postdata', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(posted => {
                if (posted.acknowledged) {
                    handleClose();
                    refetch();
                    toast.success('Task added');
                }
            })
    }

    return (
        <>
            <div className='container mt-5  bg-secondary bg-gradient'>
                <h1 className='text-center fw-bolder pt-3 pb-4' style={{ color: 'orange' }}>Check your Work Board</h1>
                <div className='row gx-5 gy-5'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4'>
                        <div className='mx-auto text-center'>
                            <Dropdown as={ButtonGroup}>
                                <Button variant="success" className='ps-5 pe-4'>TO DO</Button>

                                <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

                                <Dropdown.Menu className='text-center rounded p-0'>
                                    <Dropdown.Item onClick={handleShow}>New Task</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className='mt-3 mb-5'>
                            <Table striped bordered hover responsive variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tasks?.map((task, index) => <tr task={task} key={task._id}>
                                            <td>{index+ 1}</td>
                                            <td>{task?.title}</td>
                                            <td>{task?.description}</td>
                                        </tr>)
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>


                    <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ borderLeft: '3px solid black', height: '500px' }}>
                        <h1>Progress</h1>
                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ borderLeft: '3px solid black', height: '500px' }}>
                        <h1>Done</h1>
                    </div>

                </div>
            </div>
















































            <Modal show={show} onHide={handleClose} animation={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Add your task</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form onSubmit={getData}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name='title'
                                required
                                placeholder="task title"
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control name='descrip' as="textarea" rows={3} required />
                        </Form.Group>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" type='submit'>
                                Add Task
                            </Button>

                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Main;