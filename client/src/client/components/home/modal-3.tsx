import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function PopUp3({
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
            <input
              type="text"
              pattern="[7-9]{1}[0-9]{9}"
              className="form-control"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
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
