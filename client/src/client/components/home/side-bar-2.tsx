import React, { useState } from 'react';
import { Nav, NavLink } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { keys } from '../../../config/keys';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { connect } from 'react-redux';

function OffCanvasExample({ name, currentUser, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button
                variant="primary"
                onClick={handleShow}
                className="sidebar_button_2"
            >
                <ExpandMoreIcon />
            </Button>
            <Offcanvas
                style={{
                    fontFamily: 'cursive',
                    fontSize: '20px',
                    height: '300px'
                }}
                show={show}
                onHide={handleClose}
                {...props}
            >
                <Offcanvas.Body
                    style={{ fontFamily: 'cursive', fontSize: '20px' }}
                    className="bg-dark"
                >
                    {/* <Nav className="me-auto"></Nav> */}
                    <Nav className="me-auto ">
                        <Nav.Link
                            as={Link}
                            to="/post-ad"
                            className="mx-1 text-center"
                            style={{
                                color: 'white',
                                fontFamily: 'cursive',
                                borderRadius: '10px',
                                boxShadow: '5px 5px black'
                            }}
                        >
                            Post Ad
                        </Nav.Link>
                        {currentUser && currentUser.role === 'Admin' ? (
                            <Nav.Link
                                as={Link}
                                to="/post-item"
                                className="mx-1 text-center"
                                style={{
                                    color: 'white',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    boxShadow: '5px 5px black'
                                }}
                            >
                                Post Food&Items
                            </Nav.Link>
                        ) : null}
                        {currentUser && currentUser.role === 'Admin' ? (
                            <div>
                                <Nav.Link
                                    as={Link}
                                    to="/users"
                                    className="mx-1 text-center"
                                    style={{
                                        color: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '5px 5px black'
                                    }}
                                >
                                    Users
                                </Nav.Link>
                            </div>
                        ) : null}
                        {currentUser && currentUser.role === 'Admin' ? (
                            <div>
                                <Nav.Link
                                    as={Link}
                                    to="/orders"
                                    className="mx-1 text-center"
                                    style={{
                                        color: 'white',
                                        borderRadius: '10px',
                                        boxShadow: '5px 5px black'
                                    }}
                                >
                                    Orders
                                </Nav.Link>
                            </div>
                        ) : null}
                        <Nav.Link
                            as={Link}
                            to="/query-hub"
                            className="mx-1 text-center"
                            style={{
                                color: 'white',
                                fontFamily: 'cursive',
                                borderRadius: '10px',
                                boxShadow: '5px 5px black'
                            }}
                        >
                            Query Hub
                        </Nav.Link>

                        {currentUser && currentUser.role !== 'Admin' ? (
                            <Nav.Link
                                as={Link}
                                to="/get-my-ads"
                                className="mx-1 text-center"
                                style={{
                                    color: 'white',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    boxShadow: '5px 5px black'
                                }}
                            >
                                Your Ads
                            </Nav.Link>
                        ) : null}

                        {currentUser && currentUser.role !== 'Admin' ? (
                            <Nav.Link
                                as={Link}
                                to="/favorites"
                                className="mx-1 text-center"
                                style={{
                                    color: 'white',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    boxShadow: '5px 5px black'
                                }}
                            >
                                Favorites
                            </Nav.Link>
                        ) : null}
                        {currentUser && currentUser.role !== 'Admin' ? (
                            <Nav.Link
                                as={Link}
                                to="/your-cart"
                                className="mx-1 text-center"
                                style={{
                                    color: 'white',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    boxShadow: '5px 5px black'
                                }}
                            >
                                Your Cart
                            </Nav.Link>
                        ) : null}
                    </Nav>

                    {!currentUser && (
                        <Nav>
                            <Link
                                to="/register"
                                className="my-auto mx-2 text-center"
                                style={{
                                    fontStyle: 'none',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    boxShadow: '5px 5px black',
                                    color: 'white',
                                    textDecoration: 'none'
                                }}
                            >
                                Register
                            </Link>
                            <Link
                                to="/sign-in"
                                className="my-auto mx-2 text-center"
                                style={{
                                    fontStyle: 'none',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    boxShadow: '5px 5px black',
                                    color: 'white',
                                    textDecoration: 'none'
                                }}
                                eventKey={2}
                            >
                                Sign In
                            </Link>
                        </Nav>
                    )}

                    {currentUser && (
                        <Nav>
                            <Link
                                to={`/user-${btoa(
                                    currentUser.id
                                )}-profile-${btoa('true')}`}
                                className="my-auto mx-2 text-center"
                                style={{
                                    fontStyle: 'none',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    boxShadow: '5px 5px black',
                                    color: 'white',
                                    textDecoration: 'none'
                                }}
                            >
                                See Your Profile
                            </Link>
                            <a
                                href={`${keys.BACKEND}/api/users/signOut`}
                                className="my-auto mx-2 text-center"
                                style={{
                                    fontStyle: 'none',
                                    fontFamily: 'cursive',
                                    borderRadius: '10px',
                                    paddingLeft: '10px',
                                    paddingRight: '10px',
                                    paddingTop: '10px',
                                    paddingBottom: '10px',
                                    boxShadow: '5px 5px black',
                                    color: 'white',
                                    textDecoration: 'none'
                                }}
                                eventKey={2}
                            >
                                Logout
                            </a>
                        </Nav>
                    )}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

function SideBar2({ currentUser }) {
    return (
        <>
            {['top'].map((placement, idx) => (
                <OffCanvasExample
                    key={idx}
                    placement={placement}
                    name={placement}
                    currentUser={currentUser}
                />
            ))}
        </>
    );
}

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default connect(mapStateToProps)(SideBar2);
