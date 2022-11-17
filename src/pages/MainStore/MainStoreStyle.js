const MainStoreStyle = (theme) => ({
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
        fontSize: 1,
      },
      customCheckbox:{
        color: "#3EABC1",
        '&.Mui-checked': {
          color: "#3EABC1",
        },
      },
      check:{
        padding: 14,
        marginLeft:10,
        background:"#3EABC1",
        '&:hover': {
          backgroundColor: '#3EABC1',
          color: '#fff',
        } 
      }

    });
    
    export default MainStoreStyle;
    