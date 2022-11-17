import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MobileScreenShareIcon from '@material-ui/icons/MobileScreenShare';
import EmailIcon from '@material-ui/icons/Email';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { getAuthenticatedUser } from "../../../utils";
import moment from "moment";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Swal from "sweetalert";
import { blue } from '@material-ui/core/colors';
import hippaDocConsent from './pdf/HIPAA Release Form.pdf'
import mediDocConsent from './pdf/main_medical-consent-form.pdf'
//import ReactDOM from 'react-dom';
import HippaForm from './consentForm/hippa';
import MedicalForm from './consentForm/medical'
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  
});


  

export default function PatientConsent(props) {
  const classes = useStyles();
    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 50,flex: 0.2},
        {
          field: 'consentType',
          headerName: 'Form Type',
          minWidth: 150,flex: 0.7
        },
        {
          field: 'consentStatus',
          headerName: 'Status',
          minWidth: 150,flex: 0.7
        },
        {
          field: 'effectiveDate',
          headerName: 'Date( Effective )',
          type: 'string',
          minWidth: 150,flex: 0.7
        },
        {
          field: 'expirationDate',
          headerName: 'Date( Expiry)',
          type: 'string',
          minWidth: 150,flex: 0.7
        },
        {
          field: 'modififedBy',
          headerName: 'Modified By',
          type: 'string',
          minWidth: 150,flex: 0.7
        },
        {
          field: "Actions",
          type: "string",
          minWidth: 250,flex: 1.2,
          renderCell: (cellValues) => {
              return (
                  <>
                  <IconButton aria-label="view" onClick={() => handleClickOpen('view',cellValues.row.consentType)}>
                      <VisibilityIcon color="primary"/>
                      </IconButton>
                      <IconButton aria-label="mobile"><MobileScreenShareIcon onClick={() => sendSMS(cellValues.row,formValues["Phone Number*"])}color="primary"/></IconButton>
                      <IconButton aria-label="email"><EmailIcon onClick={() => sendEMail(cellValues.row)} color="primary"/></IconButton>
                      <IconButton aria-label="verbal"><RecordVoiceOverIcon color="primary" onClick={() => handleClickOpen('verbal',cellValues.row.consentType)}/></IconButton>
                      <IconButton aria-label="delete"><DeleteIcon color="secondary" onClick={() => deleteConsent(cellValues.row.consentType)}/></IconButton>
                      
                      </>  
                      
                  
      )
          }
      },
      
      ];
      function SimpleDialog(props) {
        
        //const mySafeHTML = DOMPurify.sanitize(hippahtmlConsent);
        const { onClose, selectedValue, open } = props;
        const docs = [       
            { uri: formName === 'HIPPA'?hippaDocConsent: mediDocConsent}, // Local File
          ];
        const handleClose = () => {
          onClose(selectedValue);
        };
      
      
        return (
          <Dialog scroll='auto'  maxWidth='md' onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogContent >
          <DialogContentText >
          {openType !== 'verbal' &&(
            <iframe src={formName === 'HIPPA'?hippaDocConsent: mediDocConsent} title='pdf' width="100%" height="500"/>
          )}
          {openType === 'verbal' && formName === 'HIPPA' &&(
              <HippaForm formValues={formValues}/>
          )}
          {openType === 'verbal' && formName !== 'HIPPA' &&(
              <MedicalForm formValues={formValues}/>
          )}
            </DialogContentText>
            </DialogContent>
            {openType === 'verbal' &&(
                <DialogActions>
                    <Button onClick={() =>verbalCommunication(formName,"Accept")} color="primary">
                        Accept
                    </Button>
                    <Button onClick={() =>verbalCommunication(formName,"Decline")} color="primary">
                        Decline
                    </Button>
              </DialogActions>
            )}
            {openType !== 'verbal' &&(
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
              </DialogActions>
            )}
          </Dialog>
        );
      }
      
      SimpleDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
      };
    
    const {        
        formValues,
        patientConsentList,
        patientConsentStatus,
        removePatientConsent,
        changeConsentStatus,
        display
      } = props;
      const [open, setOpen] = React.useState(false);
      const [list, setList] = React.useState(patientConsentList);
      const [selectedValue, setSelectedValue] = React.useState([]);
      const [formName, setformName] = React.useState('');
      const [openType, setopenType] = React.useState('');
      const [consentType, setconsentType] = React.useState( );

      const verbalCommunication = (type,status) => {

        changeConsentStatus(type,status);
        setOpen(false);
        setSelectedValue(type);
      }
      const sendSMS = (row,phoneNumber) =>{
        Swal({
            title: "Consent Disclouser on "+phoneNumber,
            text: "We will disclose you data with others",
            icon: "info",
            buttons: {
                accept: "Accept",
                denied: "Decline"
              },
          }).then((value) => {
            switch (value) {
                case "accept":
                    changeConsentStatus(row.consentType,"Accept")
                  break;
             
                case "denied":
                    changeConsentStatus(row.consentType,"Decline")
                  break;
                  default:
                    Swal("Something Wrong!");
            }
          });
      }
      const sendEMail = (row) =>{
        Swal("Please Enter your email Id:", {
            title: "Consent Disclouser",
            content: "input",
          })
          .then((res) => {
            if(res !== ''){
                Swal({
                    title: `your email Id is: ${res}`,
                    text: "Your Personal data is going to disclose other",
                    buttons: {
                        accept: "Accept",
                        denied: "Decline"
                      },
                    }).then((value) => {
                        switch (value) {
                            case "accept":
                                changeConsentStatus(row.consentType,"Accept")
                              break;
                         
                            case "denied":
                                changeConsentStatus(row.consentType,"Decline")
                              break;
                              default:
                                Swal("Something Wrong!");
                        }
                  });
                              
            }
          });
      }
    
      const handleClickOpen = (type,formName) => {
          console.log(formName);
          console.log(type)
        setformName(formName);
        setopenType(type)
        setOpen(true);
      };
    
      const deleteConsent = (val) =>{
        Swal({
            title: "Are you sure?",
            text: "You want to delete this consent!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                removePatientConsent(val);
                Swal("Your Consent has been deleted!", {
                icon: "success",
              });
            } else {
              Swal("Your consent is safe!");
            }
          });
      }
      const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
      };
      console.log(patientConsentList);

      const rows = patientConsentList.map((item,index)=>{
          return {
              id: index+1,
              consentType: item,
              consentStatus: patientConsentStatus[index].value,
              effectiveDate: moment(new Date()).format("DD-MM-YYYY"),
              expirationDate: item === 'HIPPA'?'': moment(new Date()).add(15, "days").format("DD-MM-YYYY"),
              modififedBy: getAuthenticatedUser().display
          }
      })

  return (
    <div style={{ height: 250, width: '100%' }}>
      
      <DataGrid
        
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick={true}
      />
      <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
    </div>
  );
}
