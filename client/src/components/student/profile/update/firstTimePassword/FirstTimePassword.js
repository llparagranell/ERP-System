import React from "react";
import Header from "../../../../student/Header";
import Body from "./Body";

const FirstTimePassword = () => {
  return (
    <div className="app-bg min-h-screen flex items-center justify-center p-6">
      <div className="surface-panel flex flex-col h-5/6 w-[95%] rounded-2xl space-y-6 ">
        <Header />
        <div className="flex flex-[0.95] w-full">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default FirstTimePassword;
