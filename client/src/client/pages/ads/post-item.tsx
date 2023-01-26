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
import RequireAuth from '../../components/hocs/require-auth';
import { Helmet } from 'react-helmet';
import TypeSelect from '../../components/form/type-select';
import RequireAdmin from '../../components/hocs/require-admin';
import SearchSpecies from '../../components/home/search-species';
import TypeSelect2 from '../../components/form/type-select-2';
import imageCompression from 'browser-image-compression';
import MultipleSelectCheckmarks2 from '../../components/Multiple-Select-CheckMarks-Post-Item';
import FreeSoloBird from '../../components/home/search-bird';

function PostItem() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [type, setType] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
    const [specie, setSpecie] = React.useState([]);
    const [birdName, setBirdName] = React.useState([]);
    const [birdAge, setBirdAge] = React.useState('');

    const [files, setFiles] = React.useState([]);
    const [error, setError] = React.useState('');
    const [sent, setSent] = React.useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSent(true);

        if (title.length > 30) {
            setSent(false);
            return setError('Please Keep Title Short & Simple');
        }

        if (
            !files.length ||
            !specie ||
            !birdAge ||
            !title ||
            !description ||
            !price ||
            !type ||
            !quantity
        ) {
            setSent(false);
            return setError('fill all the requirements');
        }

        if (files.length > 5) {
            setSent(false);
            return setError('At most 5 images could be selected');
        }

        // get url from this route - when all the app is single
        let urls = [];
        for (let i = 0; i < files.length; i++) {
            const { data } = await axios.get(
                `${keys.BACKEND}/api/ads/ad-upload/get-url/`
            );
            urls = [...urls, data];
        }

        // now update picture in that url
        for (let i = 0; i < files.length; i++) {
            const compressedFile = await imageCompression(files[i], {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            });
            const newFile = new File([compressedFile], compressedFile.name);
            const response = await axios.put(urls[i].url, newFile, {
                headers: { 'Content-Type': newFile.type }
            });
        }

        // here, update the picture url in user's data
        let response;

        try {
            response = await axios.post(
                `${keys.BACKEND}/api/ads/item-upload/`,
                {
                    images: urls,
                    specie,
                    birdAge,
                    birdName,
                    title,
                    description,
                    price,
                    quantity,
                    type
                }
            );
            window.location = '/';
        } catch (error) {
            setSent(false);
            if (error.response.data.errors[0])
                setError(error.response.data.errors[0].message.toUpperCase());
            else setError(error.response.data.message);
        }
    };

    //! This function is for SEO
    const head = () => (
        // Replace --- title must be user's title
        <Helmet>
            <title>{`Post Your Items Boss`}</title>
        </Helmet>
    );

    return (
        <div
            className=""
            style={{ width: '100%', minHeight: '75vh', margin: '0 auto' }}
        >
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
            <br />
        </div>
    );
}

export default {
    // component: PostItem,
    component: RequireAdmin(PostItem)
};
