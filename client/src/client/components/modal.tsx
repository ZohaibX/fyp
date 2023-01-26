import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function PopUp({
  name,
  topic,
  title,
  placeHolder,
  saveChanges,
  error,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState('');

  return (
    <>
      <Button className="popup" variant="" onClick={handleShow}>
        {name}
      </Button>

      <Modal show={show} style={{ marginTop: '30vh' }} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
              placeholder={placeHolder}
              aria-label={placeHolder}
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          {error && error.length ? (
            <div
              style={{
                width: '80%',
                margin: '0 auto',
                marginTop: '20px',
                textAlign: 'center',
                fontWeight: 'bolder',
                color: 'black',
                fontFamily: 'cursive',
              }}
              className="alert alert-primary"
            >
              {error}
            </div>
          ) : (
            ''
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => saveChanges(topic, value)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
