import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import * as React from 'react';
import { Link } from 'react-router-dom';

function DropdownHeader({ currentUser }) {
    return (
        <DropdownButton
            id="dropdown-item-button"
            align="end"
            autoClose="inside"
            variant="secondary"
            menuVariant="dark"
            style={{
                fontStyle: 'none',
                borderRadius: '10px',
                paddingLeft: '10px',
                paddingRight: '10px',
                paddingTop: '10px',
                paddingBottom: '10px',
                boxShadow: '5px 5px black',
                color: 'white',
                textDecoration: 'none',
                outline: 'none',
                width: '100%'
            }}
            title={`${currentUser.firstName} `}
        >
            <Dropdown.Item id="dropdown-item-button-1" as="button">
                <Link
                    to={`/user-${btoa(currentUser.id)}-profile-${btoa('true')}`}
                    className="my-auto mx-2"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontFamily: 'Josefin Sans'
                    }}
                >
                    See Your Profile
                </Link>
            </Dropdown.Item>

            <Dropdown.Item id="dropdown-item-button-1" as="button">
                <Link
                    to="/your-cart"
                    className="my-auto mx-2"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontFamily: 'Josefin Sans'
                    }}
                >
                    Your Cart
                </Link>
            </Dropdown.Item>

            <Dropdown.Item id="dropdown-item-button-1" as="button">
                <Link
                    to="/get-my-ads"
                    className="my-auto mx-2"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontFamily: 'Josefin Sans'
                    }}
                >
                    Your Ads
                </Link>
            </Dropdown.Item>

            <Dropdown.Item id="dropdown-item-button-1" as="button">
                <Link
                    to="/favorites"
                    className="my-auto mx-2"
                    style={{
                        textDecoration: 'none',
                        color: 'white',
                        fontFamily: 'Josefin Sans'
                    }}
                >
                    Favorites
                </Link>
            </Dropdown.Item>

            {!currentUser.socialAccount && (
                <Dropdown.Item id="dropdown-item-button-1" as="button">
                    <Link
                        to={'/change-password'}
                        className="my-auto mx-2"
                        style={{
                            textDecoration: 'none',
                            color: 'white',
                            fontFamily: 'Josefin Sans'
                        }}
                    >
                        Change Password
                    </Link>
                </Dropdown.Item>
            )}
        </DropdownButton>
    );
}

export default DropdownHeader;
