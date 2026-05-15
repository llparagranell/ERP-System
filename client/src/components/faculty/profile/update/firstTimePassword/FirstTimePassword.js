import React from "react";
import Body from "./Body";

import Header from "../../../Header";

const FirstTimePassword = () => {
  return (
    <div className="app-bg min-h-screen flex items-start justify-center p-3 sm:p-6">
      <div className="surface-panel flex flex-col w-full max-w-3xl h-auto rounded-2xl space-y-6 overflow-x-hidden overflow-y-auto">
        <Header />
        <div className="flex flex-1 w-full min-h-0">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default FirstTimePassword;
