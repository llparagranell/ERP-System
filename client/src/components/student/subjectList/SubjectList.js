import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getSubject } from "../../../redux/actions/studentActions";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Body from "./Body";

const SubjectList = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const department = user?.result?.department;
  const year = user?.result?.year;

  const dispatch = useDispatch();
  useEffect(() => {
    if (!department || !year) return;
    dispatch(getSubject(department, year));
  }, [dispatch, department, year]);
  return (
    <div className="app-bg min-h-screen flex items-start justify-center p-3 sm:p-6">
      <div className="surface-panel flex flex-col w-full max-w-7xl h-auto md:h-5/6 rounded-2xl space-y-6 overflow-x-hidden overflow-y-auto md:overflow-y-hidden">
        <Header />
        <div className="flex flex-1 flex-col md:flex-row min-h-0 gap-4 md:gap-0">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
