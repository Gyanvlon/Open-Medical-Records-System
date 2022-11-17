import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { getAllLocationsAction } from '../../../actions/locationActions'
import Location from "./LocationComponent";
import { Grid, TextField } from "@material-ui/core"
import { Autocomplete } from '@material-ui/lab'
import { GridContainer, GridItem } from "../../../components/Grid";

function PatientReferral({ getAllLocationsAction, loadingLocations, locations,selectedVisit, visitOutcomes, setPatientReferralDetails }) {
    
    const [patientReferral, setPatientReferral] = useState(null)
    const [selectedLocation, setSelectedLocation] = useState(null)
    const [selectedDate, setSelectedDate] = useState("");
console.log(locations)
    const handlePatientReferral = (event,value) => {
        console.log(value);
        setPatientReferral(event.target.value)
        setPatientReferralDetails(value)
    }
    return (
        
        <GridContainer>
            
            <GridItem item xs={12} sm={6} md={3}>{locations ?
         <Autocomplete
                    id="location"
                    options={locations}
                    getOptionLabel={(option) => (option.display)}
                    onChange={(event, value) => { handlePatientReferral(event,value) }}
                    value={patientReferral}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="OPD Internal Referral"
                            variant="outlined"
                            size="small"
                            margin="normal"
                        />
                    )} 
                    />:''}</GridItem>
        </GridContainer>
         
        
    )
}


const mapStateToProps = state => {
    return {
        loadingLocations: state.locations.loadingLocations,
        locations: state.locations.locations,
        visitOutcomes: state.concepts.visitOutcomes
    }
}

const mapDispatchToProps = {
    getAllLocationsAction

}


export default connect(mapStateToProps, mapDispatchToProps)(PatientReferral);