import * as React from 'react';
import { Form } from 'react-bootstrap';
import Select from '../../components/form/Auto-Complete';
import NormalSelect from '../../components/form/Auto-Complete-Normal';
import BirdNameSelect from '../../components/form/bird-name-autocomplete';
import Text from '../../components/form/text-field';
import UploadButton from '../../components/form/file-picker';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import useRequest from '../../hooks/use-request';
import Alert from '@mui/material/Alert';
import { keys } from '../../../config/keys';
import Axios from 'axios';
import SearchSpecies from '../../components/home/search-species';

const UpdateItem = (props) => {
    const [data, setData] = React.useState([]);
    const [birdName, setBirdName] = React.useState('');
    const [specie, setSpecie] = React.useState([]);
    const [price, setPrice] = React.useState(0);
    const [description, setDescription] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [error, setError] = React.useState('');

    const id = atob(props.match.params.id);
    console.log('ID: ', id);

    React.useEffect(() => {
        const fetchAdDetails = async () => {
            const { data } = await Axios.get(
                `${keys.BACKEND}/api/ads/get-item/${id}`
            );
            setData(data);
        };
        fetchAdDetails();
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        if (!birdName || !specie.length || !title || !description || !price)
            return alert('fill all the requirements');

        // here, update the picture url in user's data
        let response;

        console.log('SETTING');

        //   try {
        //     await axios.put(`${keys.BACKEND}/api/ads/update-item/${id}`, {
        //       birdName,
        //       specie,
        //       title,
        //       description,
        //       price,
        //     });
        //     window.location = '/';
        //   } catch (error) {
        //     if (error.response.data.errors[0])
        //       setError(error.response.data.errors[0].message.toUpperCase());
        //     else setError(error.response.data.message);
        //   }
    };

    console.log('DATA FROM UPDATE ADS', data);

    return (
        <div className="" style={{ width: '100%', margin: '0 auto' }}>
            {head()}
            <h2
                className="text-center my-5"
                style={{
                    fontFamily: 'Alfa Slab One',
                    borderBottom: '2px solid black',
                    paddingBottom: '2px',
                    width: '70%',
                    margin: '0 auto'
                }}
            >
                Upload Your Food&Accessory Item.
            </h2>

            <Form onSubmit={submit} className="form-post">
                <div className="" id="search-box-post species-select mb-2">
                    <FreeSoloBird value={birdName} setValue={setBirdName} />
                </div>
                <br />

                <div
                    className=""
                    style={{ marginLeft: '10px' }}
                    id="search-box-post species-select"
                >
                    {/* <SearchSpecies value={specie} setValue={setSpecie} /> */}
                    <MultipleSelectCheckmarks2
                        specieName={specie}
                        setSpecieName={setSpecie}
                    />
                </div>

                <div className="ad-title mb-2">
                    <Text
                        label="Give Your Ad - A Title ... "
                        value={title}
                        setValue={setTitle}
                    />
                    <Form.Text
                        className="text-muted mb-5"
                        style={{ marginLeft: '10px', marginBottom: '10px' }}
                    >
                        It must be simple and short -- comprising not more than
                        30 characters
                    </Form.Text>
                </div>

                <div className="ad-desc mb-2" style={{ marginTop: '-20px' }}>
                    <Text
                        label="Description ..."
                        value={description}
                        setValue={setDescription}
                    />
                    <Form.Text
                        className="text-muted"
                        style={{ marginLeft: '10px' }}
                    >
                        Please Type Important Details at Start
                    </Form.Text>
                </div>

                <div className="post-flex-1" style={{ marginTop: '20px' }}>
                    <div className="price mb-3" style={{ marginTop: '-20px' }}>
                        <Text
                            label="Price (PKR) ..."
                            value={price}
                            setValue={setPrice}
                            type="Number"
                        />{' '}
                    </div>

                    <div className="price mb-3" style={{ marginTop: '-20px' }}>
                        <Text
                            label="Quantity (In Stock)..."
                            value={quantity}
                            setValue={setQuantity}
                            type="Number"
                        />{' '}
                    </div>

                    <div className="upload">
                        <UploadButton files={files} setFiles={setFiles} />
                        <br />
                        {!files.length ? (
                            <Form.Text className="text-muted">
                                Please select the only images - which are
                                clearly recognizable.
                            </Form.Text>
                        ) : (
                            <Form.Text className="text-muted">
                                {files.length}{' '}
                                {files.length > 1 ? 'Images' : 'Image'}{' '}
                                {files.length > 1 ? 'are' : 'is'} selected --
                                Click the button again to Reselect
                            </Form.Text>
                        )}
                    </div>
                </div>

                <br />
                <div className="" id="location-box-post">
                    <div className="item-type" style={{ width: '90%' }}>
                        <TypeSelect type={type} setType={setType} />
                    </div>
                </div>

                <br />

                <div className="" id="location-box-post">
                    <div className="item-type" style={{ width: '90%' }}>
                        <TypeSelect2 value={birdAge} setValue={setBirdAge} />
                    </div>
                </div>

                <div className="error-alert">
                    {error && (
                        <Alert severity="error">
                            This is an error — {error}
                        </Alert>
                    )}
                    <br />
                </div>

                <div className="d-grid gap-2">
                    <Button
                        type="submit"
                        className="bg-x"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            height: '50px',
                            fontWeight: 'bold'
                        }}
                        variant="contained"
                        endIcon={!sent && <SendIcon />}
                    >
                        {!sent ? 'SEND' : 'SENDING ...'}
                    </Button>
                </div>
            </Form>

            <div className="" style={{ height: '20px' }}></div>
            <br />
            <br />
            <br />
            <br />
        </div>
    );
};

export default {
    component: UpdateItem
};
