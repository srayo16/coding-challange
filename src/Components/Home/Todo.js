import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Dropdown, DropdownButton, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Todo = ({ task, index, setReload, reload, setReload2, reload2 }) => {
    const { title, description, _id } = task;
    const [disable, setDisable] = useState(false);
    const [disabledone, setDisabledone] = useState(false);
    const [smShow, setSmShow] = useState(false);
    // console.log(task);

    // sending issue 
    const sendToProgress = (titlePro, descriptionPro) => {
        const progress = { titlePro, descriptionPro };

        fetch('http://localhost:5000/inprogress', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(progress)
        })
            .then(res => res.json())
            .then(posted => {
                if (posted.acknowledged) {
                    setSmShow(false);
                    toast.success('Moved to progress');
                    setReload(!reload);
                    setDisable(true);
                }
            })

        // console.log(titlePro, descriptionPro);
    }

    const sendToDone = (titlePro, descriptionPro) => {
        const done = { titlePro, descriptionPro };

        fetch('http://localhost:5000/indone', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(done)
        })
            .then(res => res.json())
            .then(posted => {
                if (posted.acknowledged) {
                    setSmShow(false);
                    toast.success('Moved to done');
                    setReload2(!reload2);
                    setDisabledone(true);
                }
            })
    }
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{title}</td>
            <td>{description}  {
                <span className="ms-2">
                    {['start'].map((direction) => (
                        <DropdownButton
                            as={ButtonGroup}
                            key={direction}
                            id={`dropdown-button-drop-${direction}`}
                            drop={direction}
                            variant="secondary"
                            className='p-0'
                            title=''
                        >
                            <Dropdown.Item eventKey="1"><Button onClick={() => setSmShow(true)} className="bg-light border-0 text-dark text-start w-100 p-0">
                                Send to
                            </Button> <Modal
                                size="sm"
                                show={smShow}
                                onHide={() => setSmShow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-sm">
                                            Move your task
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className='mx-auto text-center'>
                                        <Button variant="dark" disabled className='me-1'>Todo</Button>
                                        <Button variant="dark" disabled={disable} onClick={() => sendToProgress(title, description)} className='me-1'>In Progress</Button>
                                        <Button variant="dark" disabled={disabledone} onClick={() => sendToDone(title, description)} className='me-1'>Done</Button>
                                    </Modal.Body>
                                </Modal></Dropdown.Item>
                            <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                        </DropdownButton>
                    ))}
                </span>}</td>
        </tr>

    );
};

export default Todo;