import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



export default function DenseTable2({items="no" , data}) {

    function createData(
        name: string,
        calories: number,
        
      ) {
        return { name, calories, };
      }
      
      let rows ;
      
        if(items === "yes") {
          rows = [
            createData('Type', data && data.type === 'F' ? "Food": "Accessory"),   
            createData('Bird Name', data && data.birdName),   
            createData('Specie/s', data && data.specie && data.specie.toString()),  
            createData('In Stock', data && `${data.quantity} Item/s in Stock`),   
            createData('Ratings', data && data.ratings && data.ratings.totalRatings),   
          ];
        }
        else {
          rows = [
            createData('Bird Name', data && data.birdName),
            createData('Specie Name', data && data.specieName),
            createData('Gender', data && data.gender),
            createData('Age', data && data.age),
            createData('Favourite Food', data && data.favouriteFood && data.favouriteFood.length ? data.favouriteFood : "Not Provided" ),
            createData('Ratings', data && data.ratings && data.ratings.totalRatings),    
          ];
        }
      


  return (
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" size="small" aria-label="a dense table">
        
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" style={{fontWeight: "bold"}} scope="row">
                {row.name}
              </TableCell>
              <TableCell align="">{row.calories}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}