import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Input = styled('input')({
    display: 'none'
});

export default function UploadButton({ files, setFiles }) {
    const onFileChange = (e) => {
        setFiles(e.target.files);
    };

    return (
        <label htmlFor="contained-button-file">
            <Input
                accept="image/*"
                onChange={onFileChange}
                id="contained-button-file"
                multiple
                type="file"
            />
            <Button
                variant="contained"
                className="bg-x"
                style={{ color: 'white' }}
                component="span"
            >
                Upload Pictures
            </Button>
        </label>
    );
}
