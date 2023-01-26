import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export default function PopUpPassword({ saveChanges, error, currentUser }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPassword2, setNewPassword2] = React.useState('');

  return (
    <>
      <Button className="popup-password-button" variant="" onClick={handleShow}>
        Change The Password
      </Button>

      <Modal show={show} style={{ marginTop: '30vh' }} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Fill in the Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.currentTarget.value)}
              placeholder={'Type Current Password Here...'}
              aria-label={'Type Current Password Here...'}
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.currentTarget.value)}
              placeholder={'Type New Password Here...'}
              aria-label={'Type New Password Here...'}
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.currentTarget.value)}
              placeholder={'Type New Password Again...'}
              aria-label={'Type New Password Again...'}
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
          <Button
            variant="primary"
            onClick={() => {
              saveChanges(currentPassword, newPassword, newPassword2);
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
