import { React, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';


export default function BT() {
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <Button variant='primary' onClick={handleShow}>
            Modal
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Hahhahahahhahaha</Modal.Body>
            <Modal.Footer>
                <Button variant='primary' onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}

