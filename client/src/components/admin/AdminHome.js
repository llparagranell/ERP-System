import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllDepartment,
  getNotice,
} from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllStudent());
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllDepartment());
    dispatch(getNotice());
  }, [dispatch]);
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

export default AdminHome;
