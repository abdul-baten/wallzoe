import React from "react";

import {
  MuiPickersUtilsProvider,
  InlineDatePicker
} from "material-ui-pickers";

import MomentUtils from "@date-io/moment";

const datePicker = props => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <InlineDatePicker
        keyboard
        value={props.selectedDateTime}
        onChange={props.handleDateTimeChange}
      />
    </MuiPickersUtilsProvider>
  );
};

export default datePicker;
