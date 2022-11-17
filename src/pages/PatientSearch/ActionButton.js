import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import PrintIcon from '@material-ui/icons/Print';
import LinkIcon from '@material-ui/icons/Link'
import PrintAction from "./PrintAction";
import CreateABHA from "./ABHAIntegration/AddAbhaNumber"
import RevisitAction from "./RevisitAction";
import axios from "axios";
import { getAPI } from "../../services/index";
import { useHistory } from "react-router-dom";


const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    cursor:'pointer !important',
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [searchSuccessData, setSearchSuccessData] = useState(null);
  const [searchRevisitData, setSearchRevisitData] = useState(null);
  const [patientData, setPatientData] = useState([]);
  var [isPrintBoxOpen, setIsPrintBoxOpen] = useState(false);
  const [abhaIntegration, setAbhaIntegration] = useState(false);
  var [isRevisitBoxOpen, setIsRevisitBoxOpen] = useState(false);
  let history = useHistory();


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
          setIsPrintBoxOpen(false)

  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsPrintBoxOpen(false)

  };

  const onEdit = () => {
    let path = `/app/edit-patient/` + props.patiendData.row.identifier;
    history.push(path);
}

  const onRevisit = () => {
    setIsRevisitBoxOpen(false)

  var printValues = props.patiendData.row
 
  var uuid = printValues.uuid

  const url1 = `/lastVisit/patient?patient=${uuid}`;
getAPI(url1)
    .then((response) => {
      var visitUuid = response.data.visitUuid;
      const url2 = `/lastVisitDeatils/patient?visit=${visitUuid}`;

getAPI(url2)
  .then((responseVisit) => {
      setIsRevisitBoxOpen(true)
      setSearchRevisitData({
      ...searchRevisitData,
      appointmentData: printValues,
      visitData: responseVisit,
    });
      }).catch(function (error) {
          console.log(error);
      });


      }).catch(function (error) {
          console.log(error);
      });

  }
 const onAbhaCreate = () => {
   setAbhaIntegration(true);
   setPatientData(props.patiendData.row);
 }
  const onPrint = async() => {
  setIsPrintBoxOpen(false)

  var printValues = props.patiendData.row
 
  var uuid = printValues.uuid

  const personattr = await getAPI(`/patient/${uuid}?v=custom:(uuid,display,person:(attributes))`)

  var healthData = {
    healthId: '',
    healthNumber: ''
  }
  if(personattr.data){
    personattr.data.person.attributes.map((attr) => {
      if(attr.attributeType.uuid === '29d245a2-fdff-4ea0-bffe-f926d4816081'){
        healthData.healthId = attr.value;
      }
      if(attr.attributeType.uuid === '029ceb40-3837-4a8b-9233-bfd4cb8876c5'){
        healthData.healthNumber = attr.value;
      }
    })
  }
  const url1 = `/lastVisit/patient?patient=${uuid}`;
  getAPI(url1)
    .then((response) => {
      var visitUuid = response.data.visitUuid;
      const url2 = `/lastVisitDeatils/patient?visit=${visitUuid}`;

getAPI(url2)
  .then((responseVisit) => {
      setIsPrintBoxOpen(true)
      setSearchSuccessData({
      ...searchSuccessData,
      appointmentData: printValues,
      healthData:healthData,
      visitData: responseVisit,
    });
      }).catch(function (error) {
          console.log(error);
      });


      }).catch(function (error) {
          console.log(error);
      });


}
  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
              onClick={handleClick}
              size="small"
      >
        Action
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}

      >
        <StyledMenuItem>
          <ListItemIcon>
            <AddCircleOutlineIcon fontSize="small" className="AddCirclebtm" onClick={onRevisit} />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <EditIcon fontSize="small"  onClick={onEdit}/>
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={onPrint}>
          <ListItemIcon>
            <PrintIcon fontSize="small" />
          </ListItemIcon>
        </StyledMenuItem>
        <StyledMenuItem onClick={onAbhaCreate}>
          <ListItemIcon>
            <LinkIcon fontSize="small" />
          </ListItemIcon>
        </StyledMenuItem>
      </StyledMenu>
      {abhaIntegration && (
        <CreateABHA patientData={patientData}/>
      )}
      {isPrintBoxOpen && searchSuccessData && (
       <PrintAction data={searchSuccessData} />
      )}
      {isRevisitBoxOpen && searchRevisitData && (
        <RevisitAction data={searchRevisitData} mlc={props.mlc} />
     )}


    </div>
  );
}