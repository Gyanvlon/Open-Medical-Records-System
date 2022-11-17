import React, { useEffect, useState, useRef } from "react";
import Button from "@material-ui/core/Button";
import { getAPI } from "../../../services";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import swal from "sweetalert";
import styles from "../ListtoOrder/styles";
import { makeStyles } from "@material-ui/core/";
import { SaveBillingPostData } from "../../../services/data";
import { GENERAL_WARDCATEGORYUUID } from "../../../utils/constants";
import PrintBillingDataWalking from "../PrintBillingData/PrintBillingDataWalking";
const useStyles = makeStyles(styles);
function DynamicComponent(props) {
  const classes = useStyles();
  const answesrdata = props.answersactual;
  const filteritem = props.passuuid;
  console.log(props.patientData);
  let selectedlest = [];
  let colorstate = [];

  const [isselected, setIsselected] = useState(false);
  const [listcolor, setListcolor] = React.useState([]);
  const [billedinfodata, setBillinfodata] = React.useState([]);
  const [tabledata, settabledata] = React.useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [textfieldquantity, setTextfieldquantity] = useState([]);
  const [textfieldTotalquantity, setTextfieldTotalquantity] = useState([]);
  const [unitpricetextfield, setunitpricetextfield] = React.useState([]);
  const [total, setTotal] = useState([]);
  const [checktrue, setcheckedtrue] = useState([]);
  const [checked, setChecked] = React.useState([]);
  const [checkedprice, setCheckedprice] = React.useState([]);
  const [netamount, setNetAmount] = React.useState();
  const [waiveramount, setWaiverAmount] = React.useState("");
  const [errors, seterrors] = React.useState(false);
  const [checkboxstatus, setcheckboxStatus] = React.useState(false);
  const [commenterror, setCommenterror] = React.useState(false);
  const [payloadData, setPayLoadData] = useState("");
  const [printdata, setPrintData] = React.useState(false);
  const [voidbilldata, setVoidBillData] = React.useState(false);
  const [voidbilldataerror, setVoidBillDataerror] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const initialformvalues = {
    service: "",
    totalamount: "",
    totalamountPayable: "",
    amountgiven: "",
    amountreturnedtoPatient: "",
    discountamount: 0,
    Commenttextfield: "",
    voiddescription: "",
  };
  const [formData, setformData] = React.useState(initialformvalues);
  const [discountrate, setDiscountRate] = React.useState(0);
  const filteredata = answesrdata.filter((item) => item.uuid === filteritem);
  const newfilter = filteredata[0].answers;
  newfilter.map((ansersitem) => {
    ansersitem.answers.map((iteminner) => {
      if (!selectedlest.includes(iteminner.display)) {
        selectedlest.push(iteminner);
        colorstate.push(false);
      }
    });
  });
  console.log("sssssssssssss", selectedlest);

  const handleisselcted = (e, list) => {
    console.log(e);
    if (!listcolor.includes(list)) {
      setListcolor([...listcolor, list]);
    } else {
      setListcolor(listcolor.filter((item) => item !== list));
    }
  };
  const getNewaddInvestigationData = (param) => {
    getAPI(
      "/walkingPatientBillingServicesDetails/patient?patientUuid=" +
        props.patientData.id +
        "&priceCategoryConceptUuid=" +
        GENERAL_WARDCATEGORYUUID +
        param
    ).then((response) => {
      console.log("response", response);
      const newdataunitprice = response.data.billableServiceDetails.map(
        (item, index) => {
          return item.price;
        }
      );
      setunitpricetextfield(newdataunitprice);
      const setDataTotalnitPrice = response.data.billableServiceDetails.map(
        (item, index) => {
          return parseInt(item.price) * parseInt(item.quantity);
        }
      );
      const checkedfield = response.data.billableServiceDetails.map((item) => {
        return true;
      });
      setCheckedprice(checkedfield);
      setTextfieldTotalquantity(setDataTotalnitPrice);

      const totalsum = response.data.billableServiceDetails.reduce(
        (sum, item) => {
          return sum + parseInt(item.price) * parseInt("1");
        },
        0
      );
      setTotal(totalsum);
      const initialnetamount = totalsum;
      setNetAmount(initialnetamount);
      setBillinfodata(response.data.billableServiceDetails);

      settabledata(true);
    });
  };
  const handlenewInvestigation = (item) => {
    let result = item.map((list) => {
      return `&serviceConceptUuids=${list}`;
    });
    const settextfiledval = item.map((list) => {
      return "1";
    });
    const newdatacheck = item.map((item) => {
      return true;
    });
    setChecked(newdatacheck);
    setTextfieldquantity(settextfiledval);
    let resultverify = result.join().replaceAll(",", "");

    getNewaddInvestigationData(resultverify);
  };
  const handleonChecked = (e, indexparam) => {
    const updatedCheckedState = checked.map((item, index) => {
      return index === indexparam ? !item : item;
    });

    setChecked(updatedCheckedState);
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
          return (
            sum +
            parseInt(textfieldquantity[index]) *
              parseInt(unitpricetextfield[index])
          );
        }

        return sum;
      },
      0
    );

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
  const handleQuantityChange = (e, position) => {
    const data = billedinfodata.map((item, index) => {
      return index === position
        ? (textfieldquantity[index] = e.target.value)
        : textfieldquantity[index];
    });
    setTextfieldquantity(data);
    const totalmultunit = billedinfodata.map((item, index) => {
      return (
        parseInt(item.price) *
        parseInt(
          textfieldquantity[index] === "" ? "0" : textfieldquantity[index]
        )
      );
    });
    setTextfieldTotalquantity(totalmultunit);

    const totallastData = billedinfodata.reduce((sum, currentvalue, index) => {
      return (
        sum +
        parseInt(unitpricetextfield[index]) *
          parseInt(
            textfieldquantity[index] === "" ? "0" : textfieldquantity[index]
          )
      );
    }, 0);

    setTotal(totallastData);
    const amountdeducted = (totallastData * discountrate) / 100;

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
  const handleVoidBill = () => {
    if (voidbilldata === false) {
      setVoidBillData(true);
      setVoidBillDataerror(true);
    } else {
      setVoidBillData(false);
      setVoidBillDataerror(false);
    }
  };
  const handleSelectPriceChange = (event, position) => {
    const updatedCheckedState = checkedprice.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedprice(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          setCommenterror(false);
          textfieldTotalquantity[index] =
            parseInt(textfieldquantity[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldquantity[index]) *
              parseInt(unitpricetextfield[index])
          );
        } else {
          if (formData["Commenttextfield"] === "") {
            setCommenterror(true);
          } else {
            setCommenterror(false);
          }
          textfieldquantity[index] = "0";
          textfieldTotalquantity[index] =
            parseInt(textfieldquantity[index]) *
            parseInt(unitpricetextfield[index]);
          return (
            sum +
            parseInt(textfieldquantity[index]) *
              parseInt(unitpricetextfield[index])
          );
        }
      },
      0
    );

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
  const onChangevoidBillData = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.value !== "") {
      setVoidBillDataerror(false);
    } else {
      setVoidBillDataerror(true);
    }
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

    const dtatatoSend = billedinfodata.map((item, index) => {
      if (checked[index] === true) {
        return {
          serviceName: item.serviceConName,
          opdOrderId: item.opdOrderId,
          quantity: parseInt(
            formval.elements["textfieldquantity-" + index].value
          ),
          UnitPrice: parseInt(formval.elements["unitprice-" + index].value),
          totalUnitPrice: parseInt(
            formval.elements["textfieldTotalquantity-" + index].value
          ),
          billed: checked[index],
        };
      } else {
        return {
          serviceName: item.serviceConName,
          opdOrderId: item.opdOrderId,
          quantity: 0,
          UnitPrice: parseInt(formval.elements["unitprice-" + index].value),
          totalUnitPrice: 0,
          billed: checked[index],
        };
      }
    });
    const getdataserviceorder = () => {
      const data = billedinfodata.map((item, index) => {
        return {
          serviceConceptUUid: item.serviceConUuid,
          quantity: parseInt(
            formval.elements["textfieldquantity-" + index].value
          ),
        };
      });
      return data;
    };
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
      patientUuid: props.patientData.id,
      comment: formval.elements["Commenttextfield"]
        ? formval.elements["Commenttextfield"].value
        : "",
      billType: "walkin",
      orderServiceDetails: getdataserviceorder(),
    };
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
        props.setprintcheck(false);
        setPrintData(true);
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
      <PrintBillingDataWalking
        billingData={payloadData}
        patientDataprops={props.patientData}
        serviceDetailsprops={billedinfodata}
      />
    );
  } else {
    return (
      <>
        <div style={{ marginTop: 20 }}>
          {selectedlest.length > 0 &&
            selectedlest.map((list) => (
              <Button
                variant="outlined"
                // color={listcolor.includes(list.uuid) ? "Green" : "Primary"}
                size="medium"
                key={`key-${list.uuid}`}
                onClick={(e) => handleisselcted(e, list.uuid)}
                style={{
                  color: listcolor.includes(list.uuid) ? "green" : "blue",
                }}
              >
                {list.display}
              </Button>
            ))}
        </div>
        <div style={{ marginTop: 10 }}>
          {selectedlest.length > 0 && (
            <Button
              variant="contained"
              size="medium"
              color="primary"
              disabled={listcolor.length > 0 ? false : true}
              onClick={() => handlenewInvestigation(listcolor)}
            >
              Add
            </Button>
          )}
        </div>
        {tabledata && (
          <form
          onSubmit={handleformDataSubmit}
          id="formpatientdata"
          method="post"
        >
          <Table aria-label="spanning table">
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
              {billedinfodata.length > 0 &&
                billedinfodata.map((item, index) => (
                  <TableRow key={`keyindex${index}`}>
                    <TableCell className={classes.custompaddingcell}>
                      <Checkbox
                        checked={checked[index]}
                        inputProps={{ "aria-label": "primary checkbox" }}
                        id={`checkbox-${index}`}
                        onChange={(e) => {
                          handleonChecked(e, index);
                        }}
                      />
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      {index + 1}
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      {item.serviceConName}
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        required
                        id={`textfieldquantity-${index}`}
                        variant="outlined"
                        size="small"
                        //defaultValue={item.quantity}
                        value={textfieldquantity[index]}
                        onChange={(e) => handleQuantityChange(e, index)}
                        name={`textfieldquantity-${index}`}
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: 10 } }}
                        disabled={
                          (checked[index] === true ? false : true) ||
                          (checkedprice[index] === true ? false : true)
                        }
                      />
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      {" "}
                      <Checkbox
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
                        id={`unitprice-${index}`}
                        variant="outlined"
                        size="small"
                        value={unitpricetextfield[index]}
                        name={`unitprice-${index}`}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={checked[index] === true ? false : true}
                      />
                    </TableCell>
                    <TableCell className={classes.custompaddingcell}>
                      <TextField
                        required
                        id={`textfieldTotalquantity-${index}`}
                        variant="outlined"
                        size="small"
                        //defaultValue={item.quantity}
                        value={textfieldTotalquantity[index]}
                        //onChange={(e) => handleQuantityChange(e, index)}
                        name={`textfieldTotalquantity-${index}`}
                        InputProps={{
                          readOnly: true,
                        }}
                        disabled={checked[index] === true ? false : true}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              <TableRow>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
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
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
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
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
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
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
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
                <TableCell className={classes.custompaddingcell}> </TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>
                <TableCell className={classes.custompaddingcell}></TableCell>

                <TableCell className={classes.custompaddingcell}>
                  <strong>Amount Returned to Patient</strong>
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
        )}
      </>
    );
  }
}

export default DynamicComponent;
