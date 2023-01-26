//! This page is special, bcoz we have applied routes redirection using HOC

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import useRequest from '../../hooks/use-request';
import googleIcon from '../../images/google-icon.svg';
import fbIcon from '../../images/facebook-icon.svg';
import { keys } from '../../../config/keys';
import NotAllowed from '../../components/hocs/not-allowed';

const SignIn = () => {
    const [password, setPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [textMessage, setTextMessage] = React.useState(false);

    const { doRequest } = useRequest(
        `${keys.BACKEND}/api/users/signIn`,
        { email, password },
        'post'
    );

    const { doRequest: doRequest2 } = useRequest(
        `${keys.BACKEND}/api/users/forgetPassword`,
        { email },
        'post'
    );

    //? This function is for SEO
    const head = () => (
        <Helmet>
            <title>{`Trade - Sign In`}</title>
        </Helmet>
    );

    const submit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password)
            return alert('Please Fill in all the Required Fields First!');

        let response;
        response = await doRequest();
        if (response.error) setError(response.error);
        else window.location = '/';
    };

    const forgotPassword = async () => {
        setError('');
        if (!email.length)
            return alert('Valid Email must be provided to get new password');

        let response;
        response = await doRequest2();
        if (response.error) setError(response.error);
        else setTextMessage(true);
    };

    return (
        <div style={{ minHeight: '75vh' }}>
            {head()}
            {/* I can place head() function anywhere, Helmet will automatically put it into head tag */}
            <h2
                className="text-center my-5"
                style={{ fontFamily: 'Alfa Slab One' }}
            >
                Sign In.
            </h2>
            <Form onSubmit={submit} className="form-sign">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="Enter Your Email..."
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="Enter Your Password..."
                    />
                </Form.Group>

                <Form.Group
                    style={{}}
                    className="primary"
                    controlId="formBasicPassword"
                    style={{ marginBottom: '8px' }}
                >
                    <Form.Text
                        onClick={forgotPassword}
                        className=""
                        style={{ color: '#005A9C', cursor: 'pointer' }}
                    >
                        forgot password?
                    </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
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
                        Sign In...
                    </Button>
                </div>

                <Form.Group className="mb-3">
                    {textMessage && (
                        <div
                            style={{
                                marginTop: '20px',
                                fontWeight: 'bolder',
                                color: 'black',
                                fontFamily: 'cursive'
                            }}
                            className="alert alert-primary"
                        >
                            Password is sent to the provided email
                        </div>
                    )}
                </Form.Group>

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
                    {/* Replace */}
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
                            className="form-text-button"
                            style={{
                                marginLeft: '10px',
                                marginTop: '11px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        >
                            Google SignIn
                        </h6>
                    </a>

                    {/* // Replace  */}
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
                            className="form-text-button"
                            style={{
                                marginLeft: '10px',
                                marginTop: '11px',
                                fontWeight: 'bold',
                                color: 'white'
                            }}
                        >
                            Facebook SignIn
                        </h6>
                    </a>
                </div>
            </Form>
        </div>
    );
};

export default {
    component: NotAllowed(SignIn)
};
