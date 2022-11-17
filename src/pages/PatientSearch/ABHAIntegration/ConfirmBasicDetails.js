import { Paper, Table, TableBody, TableCell, TableRow, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { GridContainer, GridItem } from '../../../components'

function ConfirmBasicDetails(props) {
    const {        
        formValues,
        patientData,
        formErrors,
        onTextChange,
        photoBlob,
      } = props;
    const {
        identifer,
        name,
        phone,
        gender,
        age,
    } = patientData;
    
    return (
        <Paper>
            <GridContainer>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={2}>
                        {( photoBlob !== "" && <img alt="A" src={photoBlob} id="myImg" width="500" height="200" rounded />)}  
                        </TableCell>
                    </TableRow>
                    {photoBlob === "" && (
                        <>
                    <TableRow>
                        <TableCell>
                            <Typography>Patient Identifier</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{identifer}</Typography>
                        </TableCell>
                    </TableRow>
                    
                    <TableRow>
                        <TableCell>
                            <Typography>Patient Name</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{name}</Typography>
                        </TableCell>
                    </TableRow>
                   
                    <TableRow>
                        <TableCell>
                            <Typography>Phone Number</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{phone}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>Gender</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{gender}</Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography>Age</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography>{age}</Typography>
                        </TableCell>
                    </TableRow>
                    </>
                    )}
                </TableBody>
            </Table>
               
            </GridContainer>
        </Paper>
    )
}

export default ConfirmBasicDetails