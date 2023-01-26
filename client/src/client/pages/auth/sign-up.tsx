//! This page is special, bcoz we have applied routes redirection using HOC

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import useRequest from '../../hooks/use-request';
import googleIcon from '../../images/google-icon.svg';
import fbIcon from '../../images/facebook-icon.svg';
import { keys } from '../../../config/keys';

const { Label, Text } = Form;

const SignUp = () => {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');

    // change the backend here first
    const { doRequest } = useRequest(
        `${keys.BACKEND}/api/users/signUp`,
        { firstName, lastName, email },
        'post'
    );

    //? This function is for SEO
    const head = () => (
        <Helmet>
            <title>{`Trade - Register`}</title>
        </Helmet>
    );

    const submit = async (e) => {
        e.preventDefault();
        setError('');

        if (!firstName || !lastName || !email)
            return setError('All fields must be filled to proceed.');

        // Replace -- MUST NOW

        let response;
        response = await doRequest();

        if (response.error) setError(response.error);
        else setError('Password is sent to the email');
    };

    return (
        <div style={{ minHeight: '75vh' }}>
            {head()}
            {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}
            <h2
                className="text-center my-5"
                style={{ fontFamily: 'Alfa Slab One' }}
            >
                Register.
            </h2>
            <Form onSubmit={submit} className="form-sign">
                <div className="d-flex justify-content-between">
                    <Form.Group
                        style={{ width: '45%' }}
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.currentTarget.value);
                            }}
                            placeholder="Your First Name..."
                        />
                        {/* <Form.Text className="text-muted">
            Your Username must include special character i.e. "_" or "@".
          </Form.Text> */}
                    </Form.Group>

                    <Form.Group
                        style={{ width: '45%' }}
                        className="mb-3"
                        controlId="formBasicPassword"
                    >
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.currentTarget.value);
                            }}
                            placeholder="Your Last Name..."
                        />
                    </Form.Group>
                </div>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Your Email..."
                    />
                </Form.Group>
                <Form.Text className="text-muted">
                    Password will be sent to the email
                </Form.Text>

                <br />
                <br />
                <br />

                <div className="d-grid gap-2" id="new-button">
                    <Button
                        type="submit"
                        className="form-text-button bg-x"
                        id="form-sign-in-button"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            height: '50px',
                            fontWeight: 'bold'
                        }}
                        size="lg"
                    >
                        Register
                    </Button>
                </div>

                <Form.Group className="mb-3">
                    {error && (
                        <div
                            style={{
                                marginTop: '20px',
                                fontWeight: 'bolder',
                                color: 'black',
                                fontFamily: 'cursive'
                            }}
                            className="alert alert-primary"
                        >
                            {error}
                        </div>
                    )}
                </Form.Group>

                <div className="d-flex flex-row justify-content-between">
                    {/* // Replace */}
                    <a
                        href={`${keys.BACKEND}/api/auth/google`}
                        className="google-icon d-flex flex-row bg-x"
                        style={{
                            width: '48%',
                            borderRadius: '3px',
                            textDecoration: 'none',
                            margin: '0',
                            height: '45px'
                        }}
                    >
                        <img
                            src={googleIcon}
                            style={{
                                height: '35px',
                                marginLeft: '10px',
                                marginTop: '3px'
                            }}
                            alt=""
                        />
                        <h6
                            style={{
                                marginLeft: '10px',
                                marginTop: '11px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                            className="form-text-button"
                        >
                            Google SignUp
                        </h6>
                    </a>

                    {/* Replace */}
                    <a
                        href={`${keys.BACKEND}/api/auth/facebook`}
                        className="facebook-icon d-flex flex-row bg-x"
                        style={{
                            width: '50%',
                            borderRadius: '3px',
                            textDecoration: 'none',
                            height: '45px'
                        }}
                    >
                        <img
                            src={fbIcon}
                            style={{
                                height: '35px',
                                marginLeft: '10px',
                                marginTop: '3px'
                            }}
                            alt=""
                        />
                        <h6
                            style={{
                                marginLeft: '10px',
                                marginTop: '11px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                            className="form-text-button"
                        >
                            Facebook SignUp
                        </h6>
                    </a>
                </div>
            </Form>
        </div>
    );
};

import NotAllowed from '../../components/hocs/not-allowed';
import { emitKeypressEvents } from 'readline';
export default {
    component: NotAllowed(SignUp)
};
