import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
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

// import DynamicComponent from "./DynamicComponent";

import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { GENERAL_LABORATORY_UUID } from "../../../utils/constants";
import BillingNavbar from "../BillingNavbar";
import { useDispatch, useSelector } from "react-redux";
// import { addListOfAmbulance } from "../../../actions/billActions";
// import { BillingService } from "../../../services/data/billingService";

const useStyles = makeStyles(styles);

const AddNewBillingTenderBills = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles();

    const { ambulancesListsOf, billingAmbulanceDrivers } = useSelector(state => state?.billing)

    const [selectedAmbulance, setSelectedAmbulance] = React.useState([]);

    const [open, setOpen] = React.useState(false);
    const [formOpen, setFormOpen] = React.useState(false);
    const [listAmbulance, setListAmbulance] = React.useState([]);

    const [formData, setformData] = React.useState(
        {
            service: "",
            totalamount: "",
            totalamountPayable: "",
            amountgiven: "",
            amountreturnedtoPatient: "",
            discountamount: 0,
            Commenttextfield: "",
            voiddescription: "",
        }
    )

    async function fetchList() {
        // let res = await BillingService.getAmbulanceListInBilling()
        // console.log('res>>>>>', res)
        // dispatch(addListOfAmbulance(res))
    }

    useEffect(() => {
        fetchList()
    }, [])

    const handleAmbulanceList = (results) => {
        const driverGet = results?.map((result, index) => ({ ...result, "id": index + 1 }));
        setListAmbulance(driverGet)
        return driverGet;
    };

    useEffect(() => {
        handleAmbulanceList(ambulancesListsOf)
        // setListAmbulance(ambulancesListsOf)
        // alert('Ambulance list updatedValues ',ambulancesListsOf)

    }, [ambulancesListsOf])


    return (
        <>
            <BillingNavbar />
            <Card className={classes.root}>
                <CardHeader
                    title={"List Of Tenders"}
                    className={classes.title}
                    titleTypographyProps={{ variant: "body1" }}
                    style={{ marginTop: 10 }}
                />

                <div style={{ marginTop: 20, paddingLeft: 10, paddingRight: 10 }}>
                    {listAmbulance?.length > 0 &&
                        listAmbulance?.map((list) => (
                            <Button
                                variant="outlined"
                                size="medium"
                                key={`key-${list.uuid}`}
                                onClick={(e) => setSelectedAmbulance(list)}
                                style={{
                                    color: selectedAmbulance?.uuid === list?.uuid ? "green" : "blue", margin: 4
                                }}
                            >
                                {list?.name}
                            </Button>

                        ))}
                </div>
                <div style={{ marginTop: 10, paddingLeft: 10, paddingRight: 10 }}>
                    <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        disabled={selectedAmbulance?.uuid ? false : true}
                        onClick={() => setFormOpen(true)}
                        style={{ background: "#3EABC1", color: 'white', marginTop: 5, marginBottom: 5 }}
                    >
                        Add
                    </Button>
                </div>
                {formOpen && (
                    <form
                        // onSubmit={handleformDataSubmit}
                        id="formpatientdata"
                        method="post"
                    >
                        <Table aria-label="spanning table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Ambulance Name</TableCell>
                                    <TableCell>Patient Name</TableCell>
                                    <TableCell>Receipt No.</TableCell>
                                    <TableCell>No. of Trips</TableCell>
                                    <TableCell>Origin</TableCell>
                                    <TableCell>Destination</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow >
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                            value={selectedAmbulance?.name}
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="text"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                        />
                                    </TableCell>
                                    <TableCell className={classes.custompaddingcell}>
                                        <TextField
                                            required
                                            variant="outlined"
                                            size="small"
                                            disabled
                                        />
                                    </TableCell>
                                </TableRow>
                                {/* } */}

                            </TableBody>
                        </Table>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.margin}
                            type="submit"
                            id="btnsubmit"
                            name="btnsubmit"
                            style={{ background: "#3EABC1", color: 'white' }}

                        // disabled={
                        //   (errors === false ? true : false) ||
                        //   (checkboxstatus === true ? true : false) ||
                        //   (checkedprice.includes(false) === true
                        //     ? formData.Commenttextfield === ""
                        //       ? true
                        //       : false
                        //     : false)
                        // }
                        >
                            Save Bill
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            style={{ background: "#3EABC1", color: 'white' }}
                            className={classes.colorchange}
                        // onClick={(e) => {
                        //   window.location.reload(false);
                        // }}
                        >
                            Cancel
                        </Button>
                    </form>
                )}
            </Card>

        </>
    );
}
export default AddNewBillingTenderBills;