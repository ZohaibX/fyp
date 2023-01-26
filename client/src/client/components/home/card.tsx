import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

export default function MediaCard({
    imageLink,
    alt,
    title,
    specieName,
    age,
    gender,
    price,
    city,
    link
}) {
    return (
        <Card id="card-ad" style={{ width: '18%' }}>
            <Link to={link} style={{ textDecoration: 'none' }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={imageLink}
                        alt={alt}
                    />

                    <CardContent>
                        <Typography
                            gutterBottom
                            style={{ fontWeight: 'bold', color: 'black' }}
                            variant="h5"
                            component="div"
                        >
                            {specieName}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions>
                <div className="" style={{ width: '100%' }}>
                    <Button
                        disabled
                        className="bg-x"
                        style={{
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            width: '50%'
                        }}
                        size="small"
                    >
                        {price} PKR
                    </Button>
                    <Button
                        className="ml-5 bg-x"
                        disabled
                        style={{
                            marginLeft: '5%',
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            width: '45%'
                        }}
                        size="small"
                    >
                        {city}
                    </Button>
                </div>
            </CardActions>
        </Card>
    );
}
