import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading';
import Progress from './Progress';
import Todo from './Todo';
import Done from './Done';

const Main = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [progresses, setProgresses] = useState([]);
    const [done, setDone] = useState([]);
    const [reload, setReload] = useState(false);
    const [reload2, setReload2] = useState(false);
    const [all, setAll] = useState();

    useEffect(() => {
        fetch('http://localhost:5000/displayprogress')
            .then(res => res.json())
            .then(data => setProgresses(data))
    }, [reload])

    useEffect(() => {
        fetch('http://localhost:5000/displaydone')
            .then(res => res.json())
            .then(data => setDone(data))
    }, [reload2])

    // console.log(all);

    const { isLoading, error, data: tasks, refetch } = useQuery('repoTask', () =>
        fetch('http://localhost:5000/todo').then(res =>
            res.json()
        )
    )

    if (isLoading) return <Loading></Loading>

    if (error) return 'An error has occurred: ' + error.message
    console.log(tasks);

    // addTask submit
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

    const searching = (text) => {
        fetch(`http://localhost:5000/todo/title?=${text}`)
            .then(res => res.json())
            .then(result => {

            })

    }
    return (
        <>
            <div className='container text-center mt-5 mb-5 '>
                <input type="text" className='w-75 p-2' onChange={searching} placeholder='search here' />
            </div>
            <div className='container bg-secondary bg-gradient mb-5'>
                <h1 className='text-center fw-bolder pt-3 pb-4' style={{ color: 'orange' }}>Check your Work Board</h1>
                <div className='row gx-5 gy-1'>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ height: 'auto' }}>
                        <div className='mx-auto text-center'>
                            <Dropdown as={ButtonGroup}>
                                <Button variant="success" className='ps-5 pe-4 fw-bolder'>TO DO</Button>

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
                                        tasks?.map((task, index) => <Todo task={task} index={index} key={task._id} setReload={setReload} reload={reload} setReload2={setReload2} reload2={reload2} refetch={refetch}></Todo>)
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>


                    <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ borderLeft: '3px solid black', height: 'auto' }}>
                        <h5 className='text-center mb-3 pt-2 pb-2 rounded bg-success text-light'>Progress</h5>
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
                                    progresses.map((progress, index) => <Progress progress={progress} index={index} key={progress._id}></Progress>)
                                }
                            </tbody>
                        </Table>

                    </div>
                    <div className='col-12 col-sm-12 col-md-6 col-lg-4' style={{ borderLeft: '3px solid black', height: 'auto' }}>
                        <h5 className='text-center mb-3 pt-2 pb-2 rounded bg-success text-light'>Done</h5>
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
                                    done.map((doneSingle, index) => <Done doneSingle={doneSingle} index={index} key={doneSingle._id}></Done>)
                                }
                            </tbody>
                        </Table>
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