import React from "react";
import Medications from "./Medications";
import OrderDisplay from "./OrderDisplay";
import ProblemDiagonisis from "./ProblemDiagonisis";
import VitalSigns from "./VitalSigns";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

function DispalyCardContentGrid(props) {
  const isLoggedIn = props.propdata;
  if (isLoggedIn === "Problems And Diagonisis") {
    return (
      <>
        <ProblemDiagonisis />
        {/* <CardActions>
          <Button size="small" color="secondary" variant="contained">
            View Full Screen
          </Button>
        </CardActions> */}
      </>
    );
  }
  if (isLoggedIn === "Vital signs") {
    return <VitalSigns />;
  }
  if (isLoggedIn === "Medications") {
    return <Medications />;
  }
  if (isLoggedIn === "Orders") {
    return <OrderDisplay />;
  }
  return <div>{props.propdata}</div>;
}

export default DispalyCardContentGrid;
