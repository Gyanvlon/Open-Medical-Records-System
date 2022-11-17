import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import { getAPI } from "../../../services";
import { includes } from "lodash";
import { localstorage_key } from "../../../utils/constants";

function DynamicModalInvestigation(props) {
  const [listcolor, setListcolor] = React.useState([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(localstorage_key));
    if (stored) setListcolor(stored);
  }, []);
  useEffect(() => {
    localStorage.setItem(localstorage_key, JSON.stringify(listcolor));
  }, [listcolor]);

  const [servicedatachecking, setServiceDataChecking] = useState(
    props.servicdetailsVal.filter((item) => {
      return item.opdOrderId !== null;
    })
  );
  const [initialserviceuuid, setinitialserviceuuid] = useState(
    servicedatachecking.map((item) => {
      return item.serviceConUuid;
    })
  );
  const answesrdata = props.answersactual;
  const filteritem = props.passuuid;
  let selectedlest = [];
  let colorstate = [];

  const [isselected, setIsselected] = useState(false);

  const filteredata = answesrdata.filter((item) => item.uuid === filteritem);
  const newfilter = filteredata[0].answers;
  console.log(newfilter);
  newfilter.map((ansersitem) => {
    ansersitem.answers.map((iteminner) => {
      if (!selectedlest.includes(iteminner.display)) {
        selectedlest.push(iteminner);
        colorstate.push(false);
      }
    });
  });

  const handleisselcted = (e, list) => {
    console.log(e);
    if (initialserviceuuid.includes(list)) {
      alert("Already exsists from OPD so Cannot add or remove again");
    } else {
      if (!listcolor.includes(list)) {
        e.target.style.color = "Green";
        setListcolor([...listcolor, list]);
      } else {
        setListcolor(listcolor.filter((item) => item !== list));
        e.target.style.color = "Blue";
      }
    }
  };
  const getNewaddInvestigationData = (param) => {
    props.addNewInvestigation(param);
  };
  const handlenewInvestigation = (item) => {
    let result = item.map((list) => {
      return `&serviceConceptUuids=${list}`;
    });

    let resultverify = result.join().replaceAll(",", "");

    getNewaddInvestigationData(resultverify);
  };

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
                color: initialserviceuuid.includes(list.uuid)
                  ? "green"
                  : listcolor.includes(list.uuid)
                  ? "green"
                  : "blue",
                // color: listcolor.includes(list.uuid)
                //   ? "green"
                //   : checkserviceuid(list.uuid)
                //   ? "Green"
                //   : "Blue",
              }}
            >
              {list.display}
            </Button>
          ))}
      </div>
      <div style={{ marginTop: 10, display: "flex", justifyContent: "center" }}>
        {selectedlest.length > 0 && (
          <Button
            variant="contained"
            size="medium"
            color="primary"
            //disabled={listcolor.length > 0 ? false : true}
            onClick={() => handlenewInvestigation(listcolor)}
          >
            Click Here To Add
          </Button>
        )}
      </div>
    </>
  );
}

export default DynamicModalInvestigation;
