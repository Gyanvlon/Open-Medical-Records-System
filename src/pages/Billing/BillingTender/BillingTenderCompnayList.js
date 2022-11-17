import React, { useState, useEffect } from "react";
import {
    TextField,
    makeStyles,
    Button,
    Box,
    Typography,
    LinearProgress,
    Icon,
    InputAdornment,
    Paper,
} from "@material-ui/core/";
import { DataGrid, GridOverlay } from "@material-ui/data-grid";
import styles from "./styles";
import { Alert, Autocomplete } from "@material-ui/lab";
import moment from "moment";

import BillingNavbar from "../BillingNavbar";
import VerticalTabComponent from "../VerticalTabComponent";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { useHistory } from "react-router-dom";

import ListtoOrder from "../ListtoOrder";
import { calculateAge } from "../../../utils/commons";
import { useDispatch, useSelector } from "react-redux";

import { addBillingAmbulanceDriver } from '../../../actions/billActions'
import { BillingService } from "../../../services/data/billingService";
import BillingTenderBillsList from "./BillingTenderBillsList";
// import BillingListAmbulance from "./BillingListAmbulance";



const useStyles = makeStyles(styles);

function BillingTenderCompnayList() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const { billingAmbulanceDrivers } = useSelector(state => state?.billing)

    const [datasubmitted, setDataSubmitted] = useState(false);
    const [serchedKey, setSerchedKey] = useState('');
    const [driverData, setDriverData] = useState([]);
    const [showListToOrder, setShowListToBIlls] = useState(false);
    const [popupListData, setPopupListData] = useState([]);

    const [actualorderdate, setActualOrderdate] = React.useState(
        moment().format("DD-MM-YYYY")
    );
    const [formerrors, setformErrors] = React.useState({});
    const [loading, setLoading] = useState(true);

    const [patientnameorid, setPatientnameorid] = React.useState("");

    const craeteDriverList = (results) => {
        const driverGet = results.map((result, index) => {
            return {
                id: result.uuid,
                slno: index + 1,
                name: result.name,
                description: result.description,
                driverId: result.driverId,
                uuid: result.uuid,
            };
        });
        setDriverData(driverGet)
        return driverGet;
    };

    // fetch drivers list
    async function fetchData() {
        setLoading(true);
        let res = await BillingService.getBillingAmbulanceDriver()
        dispatch(addBillingAmbulanceDriver(res))
        setLoading(false);
    }
    useEffect(() => {
        fetchData()
    }, [])

    useEffect(async () => {
        craeteDriverList(billingAmbulanceDrivers)
    }, [billingAmbulanceDrivers])

    const CustomLoadingOverlay = () => {
        return (
            <GridOverlay>
                <div style={{ position: "absolute", top: 0, width: "100%" }}>
                    <LinearProgress />
                </div>
            </GridOverlay>
        );
    };
    const CustomNoRowsOverlay = () => {
        return (
            <GridOverlay>
                <Alert severity="info">
                    <strong>No records found.</strong>
                </Alert>
            </GridOverlay>
        );
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSerchedKey(value)
    };

    const handleSearch = () => {
        const driverGet = driverData.filter((result) => result?.name?.includes(serchedKey));
        setDriverData(driverGet)
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        setDataSubmitted(true);
        const orderinfo = {
            patientNameorId: patientnameorid,
            orderDate: actualorderdate,
        };
    };

    const columns = [
        { field: "slno", headerName: "Sl No.", width: 120 },
        {
            field: "name",
            headerName: "Name",
            width: 500,
        },
        {
            field: "description",
            headerName: "Description",
            width: 500,
        },
    ];

    const dummyRow = [
        {
          id: 1,
          slno: 1,
          name: 'dummay',
          description:'none',
          checkin: 'yes'
        },
        {
          id: 2,
          name: 'dummay',
          description:'none',
          checkin: 'yes'
        },
        {
          id: 3,
          slno: 12,
          name: 'dummay',
          description:'none',
          checkin: 'yes'
        },
        {
          id: 4,
          slno: 2,
          name: 'dummay',
          description:'none',
          checkin: 'yes'
        },
      ]

    const handleOpen = (event) => {
        console.log('>>>>>>>>>>>>>',event.row);
        setShowListToBIlls(true);
        setPopupListData(event.row);
    };
    if (showListToOrder) {
        return <BillingTenderBillsList popupListData={popupListData} />;
    } else {
        return (
            <>
                <BillingNavbar></BillingNavbar>
                <VerticalTabComponent></VerticalTabComponent>
                <div mt={2}>
                    <Typography variant="h5">List of Companies</Typography>
                    <Card className={classes.root}>
                        <CardHeader
                            title="Get Companies"
                            className={classes.title}
                            titleTypographyProps={{ variant: "body1" }}
                        />

                        {/* <Button variant="contained"
                                style={{ background: '#3EABC1', margin: 3, marginTop: 4, color: 'white' ,float:'right' }}
                                className={classes.check}
                                component={Link}
                                startIcon={<AddIcon />}
                                to="app/billing/addbillingambulancedriver"
                                >
                                Add NEW DRIVER
                            </Button> */}

                        <CardContent>
                            <form noValidate id="searchForm" onSubmit={submitHandler}>
                                <div
                                    style={{
                                        width: "100%",
                                        display: "flex",
                                        flexWrap: "wrap",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box flexGrow={0.5}>
                                        <TextField
                                            id="drivername"
                                            name="drivername"
                                            label="Search Company by name"
                                            variant="outlined"
                                            className={classes.field}
                                            onChange={handleChange}
                                            // value={drivernameorid}
                                            type="search"
                                            error={formerrors["drivername"] ? true : false}
                                            helperText={formerrors["drivername"]}
                                            fullWidth
                                            autoFocus
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Icon className="fas fa-search" />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    <Box flexGrow={0.4}>
                                        <Button
                                            variant="contained"
                                            className={classes.field}
                                            type="submit"
                                            onClick={() => handleSearch()}
                                            style={{ background: "#3EABC1", color: 'white' }}
                                        >
                                            Search
                                        </Button>

                                        <Button
                                            variant="contained"
                                            style={{ marginLeft: 6, background: "#3EABC1", color: 'white' }}
                                            className={classes.field}
                                            type="submit"
                                            onClick={() => craeteDriverList(billingAmbulanceDrivers)}
                                        >
                                            List All
                                        </Button>
                                    </Box>

                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <Paper style={{ marginTop: 4 }}>
                    <DataGrid
                        rows={dummyRow}
                        loading={loading}
                        disableColumnMenu
                        columns={columns}
                        autoHeight
                        rowHeight={40}
                        headerHeight={40}
                        pageSize={5}
                        pagination
                        onCellClick={handleOpen}
                        components={{
                            LoadingOverlay: CustomLoadingOverlay,
                            NoRowsOverlay: CustomNoRowsOverlay,
                        }}
                    />
                </Paper>
            </>
        );
    }
}


export default BillingTenderCompnayList