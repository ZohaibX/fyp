import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { keys } from '../../../config/keys';
import { fetchCurrentUser } from '../../Store/actions';
import { connect } from 'react-redux';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}));

const FoodCard = ({
    imageLink,
    title,
    birdName,
    breedName,
    description,
    price,
    type,
    date,
    key,
    link,
    itemId,
    alt,
    currentUser,
    orderButton
}) => {
    const [liked, setLiked] = React.useState(false);

    React.useEffect(() => {
        const getCurrentData = async () => {
            const { data } = await Axios(
                `${keys.BACKEND}/api/users/currentUserData`
            );
            if (
                data.data &&
                data.data.likedAds &&
                data.data.likedAds.includes(itemId)
            )
                setLiked(true);
        };
        getCurrentData();
    }, []);

    return (
        <Card className="card-item" sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {type}
                    </Avatar>
                }
                title={title}
                subheader={date.slice(0, 15)}
            />
            <Link to={link} style={{ textDecoration: 'none' }}>
                <CardMedia
                    component="img"
                    height="194"
                    image={imageLink}
                    alt={alt}
                />
            </Link>
            <CardContent>
                <Typography
                    className="item-description"
                    variant="body2"
                    color="text.secondary"
                >
                    {description.slice(0, 100)}
                </Typography>
            </CardContent>
            <CardActions className="justify-content-space-between">
                <IconButton aria-label="add to favorites">
                    <i
                        onClick={async () => {
                            if (!currentUser)
                                return alert('Please Login First');
                            if (liked) {
                                setLiked(false);
                                Axios.put(
                                    `${keys.BACKEND}/api/ads/unlike-item/${itemId}`
                                );
                            } else {
                                setLiked(true);
                                Axios.put(
                                    `${keys.BACKEND}/api/ads/like-item/${itemId}`
                                );
                            }
                        }}
                    >
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </i>
                </IconButton>
                <Button
                    disabled
                    className="item-price bg-x"
                    style={{
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                    }}
                    size="small"
                >
                    {price} PKR
                </Button>
            </CardActions>
        </Card>
    );
};

function mapStateToProps({ currentUser }) {
    return { currentUser };
}

export default connect(mapStateToProps, { fetchCurrentUser })(FoodCard);
