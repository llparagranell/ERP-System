import React, { useEffect } from "react";
import Body from "./Body";
import Header from "../../Header";
import Sidebar from "../../Sidebar";
import { useDispatch } from "react-redux";
import { getAllDepartment } from "../../../../redux/actions/adminActions";

const Update = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllDepartment());
  }, [dispatch]);
  return (
    <div className="app-bg min-h-screen flex items-center justify-center p-6">
      <div className="surface-panel flex flex-col h-5/6 w-[95%] rounded-2xl space-y-6 ">
        <Header />
        <div className="flex flex-[0.95]">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Update;
