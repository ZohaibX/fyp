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

export default function NestedList({ username, email, id, blockUser, user }) {
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
        <ListItemIcon className="list-part-1">{username}</ListItemIcon>
        <ListItemText className="list-part-2" primary={email} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <TextField
              id="standard-basic"
              className="list-part-3"
              label="Block Message"
              variant="standard"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
            />

            <ListItemIcon>
              <Button
                className="list-part-4"
                onClick={() => blockUser(message, user)}
              >
                Block
              </Button>
            </ListItemIcon>
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
