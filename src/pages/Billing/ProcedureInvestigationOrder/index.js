import React, { useEffect, useState } from "react";
import BillingNavbar from "../BillingNavbar";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import {
  makeStyles,
  Typography,
  LinearProgress,
  TextField,
  Button,
} from "@material-ui/core/";
import { useParams } from "react-router-dom";
import styles from "../ListtoOrder/styles";
import { SaveBillingPostData } from "../../../services/data";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import { Alert } from "@material-ui/lab";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import swal from "sweetalert";
import PrintBillingData from "../PrintBillingData";
import NewInvestigation from "./NewInvestigation";
import { getAPI, postAPI } from "../../../services";
import AddIcon from "@material-ui/icons/Add";
import { localstorage_key } from "../../../utils/constants";
const useStyles = makeStyles(styles);
export const ThemeContext = React.createContext();
function ProcedureInvestigationOrder(props) {
  const classes = useStyles();
  // useEffect(() => {
  //   localStorage.setItem(localstorage_key, "");
  // }, []);
  const patientData = props.patientData;
  console.log(patientData);
  const [servicdetailsVal, setServicdetailsVal] = React.useState(
    props.serviceDetailsprops.serviceDetails
  );
  //console.log(servicdetailsVal);
  const [uuidchecklist, setuuidchecklist] = React.useState(
    servicdetailsVal.map((item) => {
      return item.serviceConUuid;
    })
  );
  const [listtosendurl, setlisttosendurl] = React.useState([]);
  const [colorcheck, setColorcheck] = React.useState("");
  const [checkboxstatus, setcheckboxStatus] = React.useState(false);
  const investigationList = props.investigationList;
  const [checked, setChecked] = React.useState(
    servicdetailsVal.map((item) => {
      return true;
    })
  );
  const [printdata, setPrintData] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const initialformvalues = {
    service: "",
    totalamount: "",
    totalamountPayable: "",
    amountgiven: "",
    amountreturnedtoPatient: "",
    discountamount: 0,
    Commenttextfield: "",
  };
  const [formData, setformData] = React.useState(initialformvalues);
  const [discountrate, setDiscountRate] = React.useState(0);
  const [errors, seterrors] = React.useState(false);
  const [newTests, setNewTests] = useState(
    servicdetailsVal.map((item) => {
      return item.serviceConUuid;
    })
  );
  const [commenterror, setCommenterror] = React.useState(false);
  // const [txtcommenterror, settxtcommenterror] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [payloadData, setPayLoadData] = useState("");

  React.useEffect(() => {});
  //const initialDiscountRate=0.00;

  const [textfieldqunatityval, settextfieldqunatityval] = React.useState(
    servicdetailsVal.map((item) => {
      return "1";
    })
  );
  const [checkedprice, setCheckedprice] = React.useState(
    servicdetailsVal.map((item) => {
      return true;
    })
  );
  const [unitpricetextfield, setunitpricetextfield] = React.useState(
    servicdetailsVal.map((item) => {
      return item.price;
    })
  );
  // const [checkpricedisable, setcheckpricedisable] = React.useState(
  //   patientData.billableServiceDetails.map((item) => {
  //     return false;
  //   })
  // );
  // const [setquantityno, setsetQuantityNo] = React.useState("1");
  //console.log(patientData);
  const initialSate = {};
  const [quantitymultiplyprice, setquantitymultiplyprice] = React.useState(
    servicdetailsVal.map((item) => {
      return parseInt(item.price) * parseInt("1");
    })
  );
  const [pricevalue, setPriceValue] = React.useState(initialSate);
  const [total, setTotal] = useState(
    servicdetailsVal.reduce((sum, item) => {
      return sum + parseInt(item.price) * parseInt("1");
    }, 0)
  );
  const initialnetamount = total;
  const [netamount, setNetAmount] = React.useState(initialnetamount);
  const [waiveramount, setWaiverAmount] = React.useState("");
  const handleQuantityChange = (event, position) => {
    const data = servicdetailsVal.map((item, index) => {
      return index === position
        ? (textfieldqunatityval[index] = event.target.value)
        : textfieldqunatityval[index];
    });

    settextfieldqunatityval(data);
    const totalmultunit = servicdetailsVal.map((item, index) => {
      // return index === position
      //   ? parseInt(item.price) * parseInt(textfieldqunatityval[index])
      //   : parseInt(item.price) * parseInt(textfieldqunatityval[index]);
      return (
        parseInt(item.price) *
        parseInt(
          textfieldqunatityval[index] === "" ? "0" : textfieldqunatityval[index]
        )
      );
    });
    setquantitymultiplyprice(totalmultunit);

    const totallastData = checked.reduce((sum, currentvalue, index) => {
      if (currentvalue === true) {
        //console.log(unitpricetextfield[index]);
        //console.log(textfieldqunatityval[index]);
        return (
          sum +
          parseInt(unitpricetextfield[index]) *
            parseInt(
              textfieldqunatityval[index] === ""
                ? "0"
                : textfieldqunatityval[index]
            )
        );
      }
      // else {
      //   return (
      //     sum +
      //     parseInt(currentvalue.price) * parseInt(textfieldqunatityval[index])
      //   );
      // }
      return sum;
    }, 0);

    setTotal(totallastData);
    const amountdeducted = (totallastData * discountrate) / 100;
    //console.log(amountdeducted);
    setWaiverAmount(amountdeducted.toFixed());
    const newwaveamount = amountdeducted.toFixed();
    const leftamount = parseFloat(totallastData) - parseFloat(newwaveamount);
    setNetAmount((totallastData - newwaveamount).toFixed());
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed();
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleSelectChange = (event, position) => {
    const updatedCheckedState = checked.map((item, index) => {
      return index === position ? !item : item;
    });

    setChecked(updatedCheckedState);
    //setNewTests(newTests.filter((item) => item !== position));

    if (!updatedCheckedState.includes(true)) {
      setcheckboxStatus(true);
      swal({
        title: "Warning",
        text: "Please Select Atleast One Checkbox To proceed",
        icon: "warning",
      });
    } else {
      setcheckboxStatus(false);
    }

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          // quantitymultiplyprice[index] =
          //   parseInt(textfieldqunatityval[index]) *
          //   parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        }
        // else {
        //   textfieldqunatityval[index] = "0";
        //   quantitymultiplyprice[index] =
        //     parseInt(textfieldqunatityval[index]) *
        //     parseInt(unitpricetextfield[index]);
        //   return (
        //     sum +
        //     parseInt(textfieldqunatityval[index]) *
        //       parseInt(unitpricetextfield[index])
        //   );
        // }
        return sum;
      },
      0
    );
    //console.log(typeof totalPrice);
    setTotal(totalPrice);

    const amountdeducted = (totalPrice * discountrate) / 100;
    setWaiverAmount(amountdeducted.toFixed());
    const newwaveamount = amountdeducted.toFixed();
    setNetAmount((totalPrice - newwaveamount).toFixed());
    const leftamount = parseFloat(totalPrice) - parseFloat(newwaveamount);
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed();
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleNewInvestigationOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const getNewaddInvestigationData = (param) => {
    getAPI(
      "/procedureinvestigationorder/patient?patientUuid=" +
        patientData.id +
        "&date=" +
        patientData.orderdate +
        "&priceCategoryConceptUuid=" +
        patientData.priceCategoryConceptUuid +
        param
    ).then((response) => {
      const intestList =
        response.data.testOrderDetails[0].serviceDetailsForTestOrder[0]
          .billableServiceDetails;

      console.log("inestlistnnnnnnnnnnnnnnn", intestList);

      const to = intestList.reduce((sum, item) => {
        return sum + parseInt(item.price) * parseInt("1");
      }, 0);
      setTotal(to);
      setNetAmount(to);
      //console.log(total);

      // intestList.map((item) => {
      //   if (!unitpricetextfield.includes(item.price)) {
      //     unitpricetextfield.push(item.price);
      //   }

      //   if (!quantitymultiplyprice.includes(item.price)) {
      //     quantitymultiplyprice.push(item.price);
      //   }
      // });
      const newkey = intestList.map((item) => {
        return item.price;
      });
      const newfound = intestList.map((item) => {
        return parseInt(item.price) * parseInt("1");
      });
      setunitpricetextfield(newkey);
      setquantitymultiplyprice(newfound);
      const textfieldqunatity = intestList.map((item) => {
        return "1";
      });
      settextfieldqunatityval(textfieldqunatity);

      const check = intestList.map((item) => {
        return true;
      });
      setChecked(check);

      console.log(checked);
      const checkprice = intestList.map((item) => {
        return true;
      });
      setCheckedprice(checkprice);
      setServicdetailsVal(intestList);
    });
    // if (colorparam === "Green") {
    //   getAPI(
    //     "/procedureinvestigationorder/patient?patientUuid=" +
    //       patientData.id +
    //       "&date=" +
    //       patientData.orderdate +
    //       "&priceCategoryConceptUuid=" +
    //       patientData.priceCategoryConceptUuid +
    //       param
    //   ).then((response) => {

    //     const intestList =
    //       response.data.testOrderDetails[0].serviceDetailsForTestOrder[0]
    //         .billableServiceDetails;

    //     console.log("ssssssssssssssssssssss", intestList);
    //     setServicdetailsVal(intestList);

    //     const to = intestList.reduce((sum, item) => {
    //       return sum + parseInt(item.price) * parseInt("1");
    //     }, 0);
    //     setTotal(to);
    //     setNetAmount(to);
    //     //console.log(total);

    //     // intestList.map((item) => {
    //     //   if (!unitpricetextfield.includes(item.price)) {
    //     //     unitpricetextfield.push(item.price);
    //     //   }

    //     //   if (!quantitymultiplyprice.includes(item.price)) {
    //     //     quantitymultiplyprice.push(item.price);
    //     //   }
    //     // });
    //     const newkey = intestList.map((item) => {
    //       return item.price;
    //     });
    //     const newfound = intestList.map((item) => {
    //       return parseInt(item.price) * parseInt("1");
    //     });
    //     setunitpricetextfield(newkey);
    //     setquantitymultiplyprice(newfound);
    //     const textfieldqunatity = intestList.map((item) => {
    //       return "1";
    //     });
    //     settextfieldqunatityval(textfieldqunatity);

    //     const check = intestList.map((item) => {
    //       return true;
    //     });
    //     setChecked(check);

    //     console.log(checked);
    //     const checkprice = intestList.map((item) => {
    //       return true;
    //     });
    //     setCheckedprice(checkprice);
    //   });
    // } else {
    //   getAPI(
    //     "/procedureinvestigationorder/patient?patientUuid=" +
    //       patientData.id +
    //       "&date=" +
    //       patientData.orderdate
    //   ).then((response) => {
    //     console.log(response);

    //     const intestList =
    //       response.data.testOrderDetails[0].serviceDetailsForTestOrder[0]
    //         .billableServiceDetails;

    //     console.log(intestList);
    //     setServicdetailsVal(intestList);

    //     const to = intestList.reduce((sum, item) => {
    //       return sum + parseInt(item.price) * parseInt("1");
    //     }, 0);
    //     setTotal(to);
    //     setNetAmount(to);
    //     console.log(total);

    //     intestList.map((item) => {
    //       if (!unitpricetextfield.includes(item.price)) {
    //         unitpricetextfield.push(item.price);
    //       }
    //       if (!quantitymultiplyprice.includes(item.price)) {
    //         quantitymultiplyprice.push(item.price);
    //       }
    //     });

    //     const textfieldqunatity = intestList.map((item) => {
    //       return "1";
    //     });
    //     settextfieldqunatityval(textfieldqunatity);

    //     const check = intestList.map((item) => {
    //       return true;
    //     });
    //     setChecked(check);

    //     console.log(checked);
    //     const checkprice = intestList.map((item) => {
    //       return true;
    //     });
    //     setCheckedprice(checkprice);
    //   });
    // }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNewInvestigationClose = (name) => {
    //    let orderpayload = {
    //       patient: patientData.id,
    //       location: patientData.extraData[0].locationUuid,
    //       investigations: newTests,
    //       procedures: [],
    //   }
    //   postAPI("/orders/patient",orderpayload)
    //   .then((res)=> {
    //     //console.log(res)
    //     getNewaddInvestigationData()
    //   }
    // ).catch((e)=>console.log(e))
    // let a = listtosendurl.join().replaceAll(",", "");
    // getNewaddInvestigationData(a);
    // setOpen(false);
    // const newdatalist = newTests.map((itemlist) => {
    //   if (uuidchecklist.includes(itemlist)) {
    //   } else {
    //     setlisttosendurl((prev) => {
    //       return [...prev, `&serviceConceptUuids${itemlist}`];
    //     });
    //   }
    // });
    //const newtestdiag=newTests.filter((item,index)=>item !=uuidchecklist[index])
  };
  const addNewInvestigation = (uuid) => {
    // if (!newTests.includes(uuid)) {
    //   newTests.push(uuid);
    //   checked.push(true);
    //   listtosendurl.push(`&serviceConceptUuids=${uuid}`);
    //   checkedprice.push(true);
    //   e.target.style.color = "Green";
    //   let a = listtosendurl.join().replaceAll(",", "");
    //   getNewaddInvestigationData("Green", a);
    // } else {
    //   e.target.style.color = "Pink";
    //   setNewTests(newTests.filter((item) => item !== uuid));
    //   setlisttosendurl(listtosendurl.filter((item) => item !== uuid));
    //   let b = listtosendurl.join().replaceAll(",", "");
    //   getNewaddInvestigationData("Pink", "");
    // }
    // console.log(newTests);
    getNewaddInvestigationData(uuid);
  };
  const handleSelectPriceChange = (event, position) => {
    const updatedCheckedState = checkedprice.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedprice(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          //setCommentTextfield(false);
          setCommenterror(false);
          // textfieldqunatityval[index] = "1";
          quantitymultiplyprice[index] =
            parseInt(textfieldqunatityval[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        } else {
          //setCommentTextfield(true);
          if (formData["Commenttextfield"] === "") {
            setCommenterror(true);
          } else {
            setCommenterror(false);
          }
          textfieldqunatityval[index] = "0";
          quantitymultiplyprice[index] =
            parseInt(textfieldqunatityval[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldqunatityval[index]) *
              parseInt(unitpricetextfield[index])
          );
        }
        //return sum;
      },
      0
    );

    setTotal(totalPrice);
    const amountdeducted = (totalPrice * discountrate) / 100;
    //console.log(amountdeducted);
    setWaiverAmount(amountdeducted.toFixed());
    const newwaveamount = amountdeducted.toFixed();
    setNetAmount((totalPrice - newwaveamount).toFixed());
    const leftamount = parseFloat(totalPrice) - parseFloat(newwaveamount);
    const amountreurn = (
      parseFloat(formData.amountgiven) - parseFloat(leftamount)
    ).toFixed();
    setformData({
      ...formData,
      amountreturnedtoPatient: amountreurn,
    });
  };
  const handleInputchange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });

    if (e.target.name === "discountamount") {
      const discountrate = parseInt(
        e.target.value === "" ? "0" : e.target.value
      );
      setDiscountRate(discountrate);
      const amountdeducted = (parseInt(total) * discountrate) / 100;
      setWaiverAmount(amountdeducted.toFixed());
      const newwaveamount = amountdeducted.toFixed();
      const leftamount = (total - newwaveamount).toFixed();
      setNetAmount((total - newwaveamount).toFixed());

      const amountreurn = (
        parseFloat(formData.amountgiven) - parseFloat(leftamount)
      ).toFixed();
      setformData({
        ...formData,
        [e.target.name]: e.target.value,
        amountreturnedtoPatient: amountreurn,
      });
    }
    if (e.target.name === "amountgiven") {
      if (e.target.value !== "") {
        const newreturnedvalue = (
          parseFloat(e.target.value) - parseFloat(netamount)
        ).toFixed();
        setformData({
          ...formData,
          amountreturnedtoPatient: newreturnedvalue,
          amountgiven: e.target.value,
        });
        seterrors(true);
      } else {
        seterrors(false);
      }
    }
    if (e.target.name === "Commenttextfield") {
      if (e.target.value === "") {
        setCommenterror(true);
      } else {
        setCommenterror(false);
        setformData({
          ...formData,
          Commenttextfield: e.target.value,
        });
      }
    }
  };

  const handleformDataSubmit = async (e) => {
    e.preventDefault();

    const formval = document.getElementById("formpatientdata");
    console.log(servicdetailsVal);
    const getdataserviceorder = () => {
      const data = servicdetailsVal.map((item, index) => {
        if (item.opdOrderId !== null) {
          return {
            opdOrderId: item.opdOrderId,
            quantity: parseInt(
              formval.elements["textfiledQuantityid" + index].value
            ),
            billed: checked[index],
          };
        } else {
          return {
            serviceConceptUUid: item.serviceConUuid,
            quantity: parseInt(
              formval.elements["textfiledQuantityid" + index].value
            ),
          };
        }
      });
      return data;
    };
    console.log(getdataserviceorder());
    const dtatatoSend = servicdetailsVal.map((item, index) => {
      if (checked[index] === true) {
        return {
          serviceName: item.serviceConName,
          opdOrderId: item.opdOrderId,
          quantity: parseInt(
            formval.elements["textfiledQuantityid" + index].value
          ),
          UnitPrice: parseInt(
            formval.elements["textfieldPriceid" + index].value
          ),
          totalUnitPrice: parseInt(
            formval.elements["textfieldTotalUnitid" + index].value
          ),
          billed: checked[index],
        };
      } else {
        return {
          serviceName: item.serviceConName,
          opdOrderId: item.opdOrderId,
          quantity: 0,
          UnitPrice: parseInt(
            formval.elements["textfieldPriceid" + index].value
          ),
          totalUnitPrice: 0,
          billed: checked[index],
        };
      }
    });
    const filterdata = dtatatoSend.filter((item) => item.billed === true);

    const payload = {
      total: parseFloat(formval.elements["totalamountbilled"].value),
      waiverPercentage: parseFloat(formval.elements["discountamount"].value),
      totalAmountPayable: parseFloat(
        formval.elements["totalamountpaybale"].value
      ),
      amountGiven: parseFloat(formval.elements["amountgiven"].value),
      amountReturned: parseFloat(
        formval.elements["amountreturnedtoPatient"].value
      ),

      comment: formval.elements["Commenttextfield"]
        ? formval.elements["Commenttextfield"].value
        : "",
      billType: "out",
      orderServiceDetails: getdataserviceorder(),
    };
    //console.log(payload);

    // setPrintData(true);
    const response = await SaveBillingPostData.saveBillingData(payload);
    console.log(response);
    const finalDatatosend = {
      total: parseFloat(formval.elements["totalamountbilled"].value),
      waiverPercentage: parseFloat(formval.elements["discountamount"].value),
      waiverAmount: waiveramount,
      totalAmountPayable: parseFloat(
        formval.elements["totalamountpaybale"].value
      ),
      amountGiven: parseFloat(formval.elements["amountgiven"].value),
      amountReturned: parseFloat(
        formval.elements["amountreturnedtoPatient"].value
      ),

      comment: "xyz",
      billdata: [...filterdata],
      billid: response,
    };
    setPayLoadData(finalDatatosend);
    if (response !== false) {
      swal({
        title: "Thank You",
        text: "Billing Data Saved Successfully",
        icon: "success",
      }).then((value) => {
        setPrintData(true);
        localStorage.removeItem(localstorage_key);
      });
    } else {
      swal({
        title: "Error",
        text: "Error saving Billing Data",
        icon: "error",
      }).then((value) => {
        setTimeout(() => {
          window.location.reload(false);
        }, 200);
      });
      setPrintData(false);
    }
  };
  if (printdata === true) {
    return (
      <PrintBillingData
        billingData={payloadData}
        patientDataprops={patientData}
        serviceDetailsprops={servicdetailsVal}
      />
    );
  } else {
    return (
      <>
        <BillingNavbar></BillingNavbar>

        <Card className={classes.root}>
          <CardHeader
            title="List of Procedures and Investigations"
            className={classes.title}
            titleTypographyProps={{ variant: "body1" }}
          />
          <CardContent>
            <Grid container>
              <Grid item xs align="right">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNewInvestigationOpen}
                  startIcon={<AddIcon />}
                >
                  Add New
                </Button>
              </Grid>
              {open && (
                <NewInvestigation
                  handleNewInvestigationClose={handleNewInvestigationClose}
                  handleClose={handleClose}
                  addNewInvestigation={addNewInvestigation}
                  orderDtl={patientData}
                  investigationList={investigationList}
                  servicdetailsVal={servicdetailsVal}
                  //addnewtest={newTests}
                />
              )}
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Typography>
                  PatientId : <strong>{patientData.identifier}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Name :{" "}
                  <strong>{patientData.patientName.toUpperCase()}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Gender : <strong>{patientData.gender}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Age : <strong>{patientData.age}</strong>
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography>
                  Order Date : <strong>{patientData.orderdate}</strong>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography>
                  Patient Category :
                  <strong>
                    {" "}
                    {patientData.patientCategory === null
                      ? "N.A."
                      : patientData.patientCategory.substring(
                          0,
                          patientData.patientCategory.length - 1
                        )}
                  </strong>
                </Typography>
              </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
              <form
                onSubmit={handleformDataSubmit}
                id="formpatientdata"
                method="post"
              >
                <Table className={classes.table} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell> Select</TableCell>
                      <TableCell>Sl No.</TableCell>
                      <TableCell>Service</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Pay</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Quantity * Unit Price</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {servicdetailsVal.map((row, index) => (
                      <TableRow key={`keyindex${index}`}>
                        <TableCell className={classes.custompaddingcell}>
                          <Checkbox
                            checked={checked[index]}
                            color="primary"
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            id={`checkboxselectid${index}`}
                            name={`checkboxselectid${index}`}
                            onChange={(e) => {
                              handleSelectChange(e, index);
                            }}
                          />
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          {index + 1}
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          {row.serviceConName}
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          <TextField
                            id={`textfiledQuantityid${index}`}
                            name={`textfiledQuantityid${index}`}
                            variant="outlined"
                            size="small"
                            // defaultValue={1}
                            InputProps={{ inputProps: { min: 0, max: 10 } }}
                            value={textfieldqunatityval[index]}
                            onChange={(e) => {
                              handleQuantityChange(e, index);
                            }}
                            type="number"
                            disabled={
                              (checked[index] === true ? false : true) ||
                              (checkedprice[index] === true ? false : true)
                            }
                          />
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          <Checkbox
                            color="primary"
                            checked={checkedprice[index]}
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            id={`checkboxpriceid${index}`}
                            name={`checkboxpriceid${index}`}
                            onChange={(e) => {
                              handleSelectPriceChange(e, index);
                            }}
                            disabled={checked[index] === true ? false : true}
                          />
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          <TextField
                            id={`textfieldPriceid${index}`}
                            name={`textfieldPriceid${index}`}
                            variant="outlined"
                            size="small"
                            value={unitpricetextfield[index]}
                            InputProps={{
                              readOnly: true,
                            }}
                            disabled={checked[index] === true ? false : true}
                          />
                        </TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          <TextField
                            id={`textfieldTotalUnitid${index}`}
                            name={`textfieldTotalUnitid${index}`}
                            variant="outlined"
                            size="small"
                            value={quantitymultiplyprice[index]}
                            InputProps={{
                              readOnly: true,
                            }}
                            disabled={checked[index] === true ? false : true}
                          />
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        Total
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={total}
                          id="totalamountbilled"
                          name="totalamountbilled"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        Discount(%)
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={formData.discountamount}
                          id="discountamount"
                          name="discountamount"
                          onChange={(e) => {
                            if (e.target.value.length > 3) return false;
                            handleInputchange(e);
                          }}
                          InputProps={{ inputProps: { min: 0, max: 100 } }}
                          type="number"
                          style={{ minWidth: 208 }}
                        />
                      </TableCell>
                    </TableRow>
                    {checkedprice.includes(false) && checkedprice.length > 0 && (
                      <TableRow>
                        <TableCell
                          className={classes.custompaddingcell}
                        ></TableCell>
                        <TableCell
                          className={classes.custompaddingcell}
                        ></TableCell>
                        <TableCell
                          className={classes.custompaddingcell}
                        ></TableCell>
                        <TableCell
                          className={classes.custompaddingcell}
                        ></TableCell>
                        <TableCell
                          className={classes.custompaddingcell}
                        ></TableCell>
                        <TableCell className={classes.custompaddingcell}>
                          Comment
                        </TableCell>

                        <TableCell className={classes.custompaddingcell}>
                          <TextField
                            variant="outlined"
                            error={
                              formData["Commenttextfield"] === "" ? true : false
                            }
                            size="small"
                            value={formData.Commenttextfield}
                            id="Commenttextfield"
                            name="Commenttextfield"
                            onChange={(e) => {
                              handleInputchange(e);
                            }}
                            helperText={
                              formData["Commenttextfield"] === ""
                                ? "This field is required"
                                : ""
                            }
                          />
                        </TableCell>
                      </TableRow>
                    )}

                    <TableRow>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <strong>Total Amount Payable</strong>
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={netamount}
                          id="totalamountpaybale"
                          name="totalamountpaybale"
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <strong> Amount Given</strong>
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          error={errors === false ? true : false}
                          variant="outlined"
                          size="small"
                          value={formData.amountgiven}
                          id="amountgiven"
                          name="amountgiven"
                          placeholder="Please enter the amount"
                          onChange={(e) => {
                            console.log(e.target.value.length);
                            if (e.target.value.length > 8) return false;

                            handleInputchange(e);
                          }}
                          type="number"
                          helperText={
                            errors === false ? "This field is required" : ""
                          }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>
                      <TableCell
                        className={classes.custompaddingcell}
                      ></TableCell>

                      <TableCell className={classes.custompaddingcell}>
                        Amount Returned to Patient
                      </TableCell>
                      <TableCell className={classes.custompaddingcell}>
                        <TextField
                          variant="outlined"
                          size="small"
                          value={formData.amountreturnedtoPatient}
                          id="amountreturnedtoPatient"
                          name="amountreturnedtoPatient"
                          type="number"
                          InputProps={{
                            readOnly: true,
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.margin}
                  type="submit"
                  id="btnsubmit"
                  name="btnsubmit"
                  disabled={
                    (errors === false ? true : false) ||
                    (checkboxstatus === true ? true : false) ||
                    (checkedprice.includes(false) === true
                      ? formData.Commenttextfield === ""
                        ? true
                        : false
                      : false)
                  }
                >
                  Submit
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.colorchange}
                  onClick={(e) => {
                    window.location.reload(false);
                  }}
                >
                  Cancel
                </Button>
              </form>
            </TableContainer>
          </CardContent>
        </Card>
      </>
    );
  }
}

export default ProcedureInvestigationOrder;
