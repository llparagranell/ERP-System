import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
const isNotActiveStyle =
  "nav-item";
const isActiveStyle =
  "nav-item nav-item-active";

const Sidebar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useCallback(() => {
    alert("OOPS! Your session expired. Please Login again");
    dispatch({ type: "LOGOUT" });
    navigate("/login/facultylogin");
  }, [dispatch, navigate]);
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("faculty")));
  }, [logout, user?.token]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navContent = (
    <div className="space-y-8">
      <div className="">
        <NavLink
          to="/faculty/home"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <HomeIcon className="" />
          <h1 className="font-normal">Dashboard</h1>
        </NavLink>
        <NavLink
          to="/faculty/profile"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AssignmentIndIcon className="" />
          <h1 className="font-normal">Profile</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/faculty/createtest"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Create Test</h1>
        </NavLink>
        <NavLink
          to="/faculty/uploadmarks"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Upload Marks</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/faculty/markattendance"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <EngineeringIcon className="" />
          <h1 className="font-normal">Mark Attendance</h1>
        </NavLink>
      </div>
    </div>
  );
  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed bottom-4 left-4 z-40 surface-panel border border-white/10 rounded-xl p-3 shadow-lg">
        <MenuIcon fontSize="small" />
      </button>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 max-w-[85vw] surface-panel border-r border-white/10 p-4 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h2 className="font-bold">Menu</h2>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg hover:bg-white/5">
                <CloseIcon fontSize="small" />
              </button>
            </div>
            <div className="pt-4">{navContent}</div>
          </div>
        </div>
      )}

      <div className="hidden md:block md:flex-[0.2]">
        <div className="space-y-8 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10 md:h-[33rem] pr-2">
          {navContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
