import * as React from 'react';
import { fetchCurrentUser } from '../Store/actions/index';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Alert, TextField } from '@mui/material';
import Axios from 'axios';
import { keys } from '../../config/keys';

const ChangePassword = (props) => {
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');

    React.useEffect(() => {
        props.fetchCurrentUser();
    }, []);

    const head = () => (
        <Helmet>
            <title>{`${'Change Password'}`}</title>
            {/* // this is how we will make our title dynamic */}
            <meta property="og:title" content="Admins List"></meta>
            {/* // this title is for SEO -- to identify this page title  */}
            {/* // we normally have to add 4 required meta tags and we can add more optional meta tags for SEO */}
            {/* //? https://ogp.me/ */}
        </Helmet>
    );

    console.log(props.currentUser);
    return (
        <div className="" style={{ minHeight: '75vh' }}>
            {head()}

            <h1 className="text-center change-password-text">
                Change Password
            </h1>

            <div className="password-form">
                <div className="password-form-current">
                    <TextField
                        id="standard-password-input"
                        label="Enter Current Password"
                        value={currentPassword}
                        onChange={(e) =>
                            setCurrentPassword(e.currentTarget.value)
                        }
                        className="password-form-current-text"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </div>

                <br />
                <div className="password-form-current">
                    <TextField
                        id="standard-password-input"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.currentTarget.value)}
                        label="Enter New Password"
                        className="password-form-current-text"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </div>

                <br />

                <div className="password-form-current">
                    <TextField
                        id="standard-password-input"
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.currentTarget.value)}
                        label="Enter New Password Again"
                        className="password-form-current-text"
                        type="password"
                        autoComplete="current-password"
                        variant="standard"
                    />
                </div>

                <div className="error-alert">
                    {error && (
                        <Alert
                            severity="error"
                            style={{
                                width: '40rem',
                                margin: '0 auto',
                                marginTop: '2rem'
                            }}
                        >
                            This is an error — {error}
                        </Alert>
                    )}
                    <br />
                </div>

                <div className="password-form-current">
                    <p
                        className="save-changes mt-5 profile-picture-image-box-upload-button"
                        style={{
                            margin: '0 auto',
                            textAlign: 'center'
                        }}
                        onClick={async () => {
                            if (newPassword !== newPassword2)
                                setError('NEW PASSWORDS ARE NOT SAME');
                            else if (newPassword.length < 8)
                                setError(
                                    'New Password must be at least 8 characters long'
                                );
                            else {
                                try {
                                    await Axios.post(
                                        `${keys.BACKEND}/api/users/changePassword`,
                                        { currentPassword, newPassword }
                                    );
                                    window.location = '/';
                                } catch (error) {
                                    return alert('Something went wrong!');
                                }
                            }
                        }}
                    >
                        Save Changes
                    </p>
                </div>
            </div>
        </div>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default {
    component: connect(mapStateToProps, { fetchCurrentUser })(ChangePassword)
};
