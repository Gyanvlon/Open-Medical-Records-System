import React, { useState , useEffect} from 'react';
import { getAPI } from "../../services/index";
import Radio from '@material-ui/core/Radio';

import { Typography ,TableCell,
  TableRow,
  TextField,} from '@material-ui/core';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import styles from "./styles";

function PatientCategoryRevisit(props) {

  var formValues = props.formValues;
  var [categoryData, setCategoryData] = useState([]);
  var [patientCategory, setPatientCategory] = useState('');
  var [isPatientCategory, setIsPatientCategory] = useState(false);
  var [patientCategoryList, setPatientCategoryList] = useState([]);
  var [ispatientsubCategory, setIsPatientSubCategory] = useState(false);
  var [patientSubCategory, setPatientSubCategory] = useState('');
  var [patientSubCategoryList, setPatientSubCategoryList] = useState([]);
  var [patientssubCategory, setPatientSSubCategory] = useState('');
  var [ispatientssubCategory, setIsPatientSSubCategory] = useState(false);
  var [textFieldName, setTextFieldName] = useState('');
  

  console.log(props.patientC)
  console.log(props.patientC1)
  console.log(props.patientC2)
  useEffect(() => {
    let url1 =
    "/concept?q=Patient Category*&v=custom:(answers:(uuid,display,answers:(uuid,display,datatype:(display),synonyms:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display),answers:(uuid,display,datatype:(display)))))";
  getAPI(url1)
    .then((response) => {
     console.log(response.data);
     setCategoryData(response.data.results[0].answers);
    })
    .catch((error) => console.log(error));

   }, []);
   function getSubCategoryList(name){
          categoryData.map((item) =>{
            if(item.display === name){
              setPatientCategoryList(item.answers);
            }
          })
   }
   function getNextSubCategoryList(name){          
    patientCategoryList.map((item) =>{
      let uniqueObjArray = [...new Map(item.answers.map((item) => [item["uuid"], item])).values()];
        
        console.log(uniqueObjArray) 
        setPatientSubCategoryList(uniqueObjArray);
      
    })
    
}
   const handleChange = (e) =>{

    setIsPatientCategory(true);
    setIsPatientSubCategory(false);
    setIsPatientSSubCategory(false)
    setPatientCategory(e.target.value);
    const val = e.target.name;
    getSubCategoryList(val)

   }
   const handlePatientCategory = (e) =>{
    setIsPatientSubCategory(true);
    setIsPatientSSubCategory(false);
    setPatientSubCategory(e.target.value);
    const val = e.target.name;
    getNextSubCategoryList(val)
   }
   const handlePatientSubCategory = (e) =>{
    setIsPatientSSubCategory(true)
    setPatientSSubCategory(e.target.value);
    const val = e.target.name;
    if(val === 'Cash')
    setTextFieldName(val);
    else setIsPatientSSubCategory(false)
   }
    return (
        
         <TableRow>
              <TableCell >
                <Typography>PATIENT CATEGORY</Typography>
            </TableCell>
              <TableCell colSpan={2}>
              <FormControl >
      
      <RadioGroup row
        aria-labelledby="demo-radio-buttons-group-label"
        name="patient-category"
        defaultValue={props.patientC}
        value={patientCategory}
         onChange={handleChange}
      >
      {categoryData.map((category, index) => (
        <FormControlLabel name={category.display} value={category.uuid} control={<Radio color="primary"/>} label={category.display} />
        
        ))}
        </RadioGroup>
        <RadioGroup row
            aria-labelledby="demo-radio-buttons-group-label"
            value={patientSubCategory} onChange={handlePatientCategory}
            name="patient-sub-category"
          >
            {isPatientCategory &&
                patientCategoryList.map((sub, index2) =>(
                <FormControlLabel  name={sub.display} value={sub.uuid} control={<Radio color="primary"/>} label={sub.display} />
            
            ))} 
            </RadioGroup>
            <RadioGroup row
              value={patientssubCategory} onChange={handlePatientSubCategory}
              
            >
            {ispatientsubCategory &&
                patientSubCategoryList.map((item, index2) =>(
              <FormControlLabel name={item.display} value={item.uuid} control={<Radio color="primary"/>} label={item.display} />
              ))}
            </RadioGroup>
            {(ispatientssubCategory && textFieldName === 'Cash') &&(
              <TextField label={textFieldName}/>
            )}
    </FormControl>



           </TableCell></TableRow>
    )
}

export default PatientCategoryRevisit