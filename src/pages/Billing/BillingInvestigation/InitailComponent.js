import React from "react";
import Button from "@material-ui/core/Button";
function InitailComponent(props) {
  const datapassed = props.passdata.answers;
  let selectedlest = [];
  props.passdata.answers.map((ansersitem) => {
    ansersitem.answers.map((iteminner) => {
      selectedlest.push(iteminner.display);
    });
  });
  console.log(selectedlest);
  return (
    <div>
      {selectedlest.length > 0 &&
        selectedlest.map((list) => (
          <Button
            variant="outlined"
            color="primary"
            size="small"
            key={`key-${list}`}
          >
            {list}
          </Button>
        ))}
    </div>
  );
}

export default InitailComponent;
