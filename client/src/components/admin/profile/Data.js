import React from "react";
import * as classes from "../../../utils/styles";
const Data = ({ label, value }) => {
  return (
    <div className={classes.adminForm3}>
      <h1 className={classes.adminLabel}>{label} :</h1>
      <h2 className="font-normal text-lg bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white/90">
        {value}
      </h2>
    </div>
  );
};

export default Data;
