import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DenseTable(props) {

    function createData(
        name: string,
        calories: number,
        
      ) {
        return { name, calories, };
      }
      
      let rows ;
      let user ;
      let order

      if(props && props.user) {
        user = props.user
        rows = [
            createData('First Name', user && user.firstName),
            createData('Last Name', user && user.lastName),
            createData('Email', user && user.email),
            createData('City', user && user.city),
            createData('State', user && user.state),
            createData('Country', user && user.country),
            createData('Address', user && user.address),
            createData('Phone Number', user && user.phoneNumber),
            createData('Profile Completed?', user && user.completed_profile === true ? "TRUE": "FALSE"),        
          ];
      }
      else {
        order = props.order
        rows = [
            createData('Title', order && order.title),      
            createData('Specifically for Specie/s', order && order.specie && order.specie.toString()),  
            createData('Price Per Item', order && order.price/order.quantity),      
            createData('Total', order && order.price),      
            createData('Quantity', `${order && order.quantity} Items`),
            createData('Type', order && order.type === "A" ? "Accessory Item": "Food Item"),  

          ];
      }


  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" size="small" aria-label="a dense table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="">Calories</TableCell>
            
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" style={{fontWeight: "bold"}} scope="row">
                {row.name}
              </TableCell>
              <TableCell className="cell-x" align="">{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}