import { height } from "@mui/system";

const pageStyles = (theme) => ({
  root: {
   backgroundColor: theme.palette.background.paper,
   marginTop:`1rem`,
   marginBottom: "1rem"
   
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    background:`#fff`,
    color:`#000`
  },
  a: {
    color: "#000",
    "&:hover": {
        color: "#000"
       
    }
  },
    customBTN: {
      padding: 14,
      marginLeft:10,
      background:"#3EABC1",
      '&:hover': {
        backgroundColor: '#3EABC1',
        color: '#fff',
      }  
    },
    customBox:{
        // marginBottom:10,
    },
    headerText:{
       fontWeight: 'bold',
       textTransform: 'uppercase', 
       marginLeft:15, 
       marginTop:15,
       fontSize:18
    },
    header: {
      backgroundColor: "#3EABC1",
      color: "#FFFFFF",
      fontSize: 18,
    },
    customCheckbox:{
      color: "#3EABC1",
      '&.Mui-checked': {
        color: "#3EABC1",
      },
    },
    cellStyle:{
      fontSize:13,
      padding:8,
      paddingTop:1,
      paddingBottom:1,
    },
    cellStyles:{
      fontSize:10,
      padding:4,
      paddingTop:1,
      paddingBottom:1,
    },
    cells:{
      fontSize:10,
      padding:1,
      paddingTop:1,
      paddingBottom:1,
    }
  });
  
  
  export default pageStyles;
  