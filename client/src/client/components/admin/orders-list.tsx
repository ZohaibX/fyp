import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { keys } from '../../../config/keys';
import { Link } from 'react-router-dom';

export default function OrdersNestedList({
  username,
  email,
  itemTitle,
  itemPrice,
  itemId,
  itemBirdName,
  itemBreedName,
  city,
  phoneNumber,
  address,
  key1,
  order,
  orderCompleted,
}) {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      className="list-component"
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{key1}</ListItemIcon>
        <ListItemText primary={itemTitle} />
        <ListItemText primary={`${itemPrice} PKR`} />

        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse
        className="list-collapse"
        in={open}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" className="list-collapse" disablePadding>
          <ListItemButton className="list-collapse" sx={{ pl: 4 }}>
            <div
              className=""
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <ListItemText primary={username} />
              <ListItemText primary={email} />
              {/* <ListItemText primary={address} /> */}
              <TextField
                id="standard-basic"
                variant="standard"
                value={`Address -- ${address}`}
              />

              <Link
                className="list-link"
                to={`/item-details-${btoa(itemId)}-${btoa(order.id)}-details-x`}
              >
                {' '}
                <ListItemText
                  className="list-link-part"
                  primary={`${itemBirdName} -- ${itemBreedName}`}
                />
              </Link>

              <ListItemIcon>
                <Button
                  className="list-completed"
                  onClick={() => orderCompleted(itemId, order)}
                >
                  Completed
                </Button>
              </ListItemIcon>
            </div>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
