import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Upload = (props: any) => {
    const [file, setFile] = React.useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!file) return alert('File is not selected');

        // EVERYTHING IS CHECKED -- ALL CONFIGURATION IS IN WORKING
        // JUST NEED TO MAKE THIS A SINGLE APP

        // get url from this route - when all the app is single
        // const url = await axios.get("http://localhost:5000/api/users/image-upload/get-url");

        // url.data contains {key , url} from our backend

        // now update picture in that url
        // const response = await axios.put(url.data.url, file, {
        //   headers: { 'Content-Type': file.type },
        // });

        // here, update the picture url in user's data
        // const { data } = await axios.post('http://localhost:5000/api/users/image-upload', {
        //   imageUrl: url.data.key, // i can add more data here like -- ...data
        // });
    };

    return (
        <div className="container">
            <h1 className="text-center my-5 font-weight-bolder">
                This is Upload Page
            </h1>
            <form action="" onSubmit={onSubmit}>
                <h5>Add an image</h5>
                <input type="file" onChange={onFileChange} accept="image/*" />
                <button className="btn bg-x">Submit</button>
            </form>
            {/* make sure we are using double quotes at type  */}
            <br />
            <img src="" alt="" />
            {/* Second string is the key, we will get from our backend db -- as an imageUrl */}
            {/* 1st string is the bucket url and i can get this by going into bucket - inside any image */}
            {/* now, it depends on us, if we use some env variable for 1st string -- and second string will be obviously from backend - not hard coated */}
            {/* Second String Must be like userId/someUniqueKey.jpeg bcoz thats how we have set it in backend - get-url route*/}
        </div>
    );
};

export default {
    component: Upload
};
