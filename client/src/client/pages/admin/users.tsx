import * as React from 'react';
import { fetchCurrentUser } from '../../Store/actions';
import axios from 'axios';
import { connect } from 'react-redux';
import { keys } from '../../../config/keys';
import { Helmet } from 'react-helmet';
import RequireAdmin from '../../components/hocs/require-admin';
import NestedList from '../../components/admin/list';
import TextField from '@mui/material/TextField';
import { Form, Button } from 'react-bootstrap';
import useRequest from '../../hooks/use-request';

const Users = ({ fetchCurrentUser, currentUser }) => {
    const [users, setUsers] = React.useState([]);
    const [searchValue, setSearchValue] = React.useState('');
    const [unblockEmail, setUnblockEmail] = React.useState('');
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');

    const { doRequest } = useRequest(
        `${keys.BACKEND}/api/users/un-ban-user/${unblockEmail}`,
        {},
        'post'
    );

    React.useEffect(() => {
        fetchCurrentUser();

        const getAllAccounts = async () => {
            try {
                const { data } = await axios.get(
                    `${keys.BACKEND}/api/users/get-all-user-accounts`
                );
                console.log('here: ', data);
                setUsers(data);
            } catch (error) {
                alert('There went something wrong! 10X');
            }
        };
        getAllAccounts();
    }, []);

    let searchedUsers = [];
    if (searchValue.length) {
        for (const key in users) {
            if (
                users[key] &&
                users[key].username &&
                users[key].username
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            )
                searchedUsers.push(users[key]);
            if (
                users[key] &&
                users[key].email &&
                users[key].email
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            )
                searchedUsers.push(users[key]);
        }
    } else {
        searchedUsers = [...users];
    }

    const head = () => (
        <Helmet>
            <title>{`${users.length} User(s) Loaded`}</title>
            {/* // this is how we will make our title dynamic */}
            <meta property="og:title" content="Users List"></meta>
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    const blockUser = async (message, user) => {
        if (!message.length) return alert('Message Must Be Provided');
        if (message.length < 50)
            return alert('Message Must Not Be Less Than 50 Characters');

        let currentUsers = [...users];
        let currentUsers2 = [...users];

        try {
            let index = [currentUsers.indexOf(user)];

            currentUsers.splice(index, 1);
            setUsers(currentUsers);

            await axios.post(
                `${keys.BACKEND}/api/users/delete-user/${user.id}`,
                {
                    text: message
                }
            );
        } catch (e) {
            alert('Something Went Wrong');
            return setUsers(currentUsers2);
        }
    };

    const unblock = async () => {
        setError('');
        if (!unblockEmail.length)
            return alert('Please provide a valid blocked email!');

        let response;
        response = await doRequest();
        if (response.error) setError(response.error);
        else {
            setError('Done Successfully');
        }
    };

    return (
        <div className="users-page" style={{ minHeight: '75vh' }}>
            {head()}
            <div
                className="my-2 text-center"
                style={{
                    fontFamily: 'Bebas Neue',
                    fontSize: '50px',
                    letterSpacing: '2px'
                }}
            >
                USERS
            </div>

            <div className="unblock-users">
                <TextField
                    className="unblock-users-1"
                    id="standard-basic"
                    label="User Email"
                    value={unblockEmail}
                    onChange={(e) => setUnblockEmail(e.currentTarget.value)}
                    variant="standard"
                />
                <p
                    className="btn bg-x color-white unblock-users-2"
                    onClick={unblock}
                >
                    Unblock User
                </p>
            </div>

            <Form.Group className="mb-3 text-center">
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

            <div className="search-box-x">
                <TextField
                    id="standard-basic"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.currentTarget.value)}
                    label="Search by User-Email or Username"
                    variant="standard"
                />
            </div>

            <div className="list users-list">
                {searchedUsers.length ? (
                    searchedUsers.map((user) => (
                        <NestedList
                            key={user.id}
                            username={user.username}
                            email={user.email}
                            id={user.email.id}
                            user={user}
                            blockUser={blockUser}
                        />
                    ))
                ) : (
                    <h4
                        className="my-5 text-center"
                        style={{
                            fontFamily: 'Bebas Neue',
                            fontSize: '30px'
                        }}
                    >
                        No User Found
                    </h4>
                )}
            </div>
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default {
    // component: RequireAdmin(
    //   connect(mapStateToProps, { fetchCurrentUser })(Users)
    // ),
    component: connect(mapStateToProps, { fetchCurrentUser })(Users)
};
