import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MaxHeightTextarea from './text-area';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="full-box">
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          justifyContent: 'center',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            style={{ fontWeight: 'bold' }}
            label="Description"
            {...a11yProps(0)}
          />
          <Tab
            style={{ fontWeight: 'bold', marginLeft: '10%' }}
            label="Contact"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <div>
        <TabPanel value={value} index={0}>
          <p id="ad-description">{props.description}</p>
        </TabPanel>
        <TabPanel value={value} index={1} style={{ textAlign: 'justify' }}>
          <span style={{ fontWeight: 'bold' }}>Owner:</span> <span></span>
          {props.username} -- {props.email}
          <br />
          <br />
          <span style={{ fontWeight: 'bold' }}>Location Details:</span>{' '}
          <span></span>
          {props.locationDetails} -- {props.city}
          <br />
          <span style={{ fontWeight: 'bold' }}>Contact Number:</span>{' '}
          {props.contactNumber}
        </TabPanel>
      </div>
    </Box>
  );
}
