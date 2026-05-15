import React, { useCallback, useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuBookIcon from "@mui/icons-material/MenuBook";
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
    navigate("/login/adminlogin");
  }, [dispatch, navigate]);
  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("admin")));
  }, [logout, user?.token]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  // useEffect(() => {
  //   if (rf === "home") {
  //     elRef[0].current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "end",
  //       inline: "nearest",
  //     });
  //   }
  // }, []);

  const navContent = (
    <div className="space-y-8">
      <div className="">
        <NavLink
          to="/admin/home"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <HomeIcon className="" />
          <h1 className="font-normal">Dashboard</h1>
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AssignmentIndIcon className="" />
          <h1 className="font-normal">Profile</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/createNotice"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Create Notice</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/addadmin"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Add Admin</h1>
        </NavLink>
        <NavLink
          to="/admin/deleteadmin"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <DeleteIcon className="" />
          <h1 className="font-normal">Delete Admin</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/adddepartment"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Add Department</h1>
        </NavLink>
        <NavLink
          to="/admin/deletedepartment"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <DeleteIcon className="" />
          <h1 className="font-normal">Delete Department</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/allfaculty"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <EngineeringIcon className="" />
          <h1 className="font-normal">Our Faculty</h1>
        </NavLink>

        <NavLink
          to="/admin/addfaculty"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Add Faculty</h1>
        </NavLink>
        <NavLink
          to="/admin/deletefaculty"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <DeleteIcon className="" />
          <h1 className="font-normal">Delete Faculty</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/allstudent"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <BoyIcon className="" />
          <h1 className="font-normal">Our Students</h1>
        </NavLink>

        <NavLink
          to="/admin/addstudent"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Add Students</h1>
        </NavLink>
        <NavLink
          to="/admin/deletestudent"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <DeleteIcon className="" />
          <h1 className="font-normal">Delete Student</h1>
        </NavLink>
      </div>
      <div className="">
        <NavLink
          to="/admin/allsubject"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <MenuBookIcon className="" />
          <h1 className="font-normal">Subjects</h1>
        </NavLink>

        <NavLink
          to="/admin/addsubject"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <AddIcon className="" />
          <h1 className="font-normal">Add Subject</h1>
        </NavLink>
        <NavLink
          to="/admin/deletesubject"
          className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}>
          <DeleteIcon className="" />
          <h1 className="font-normal">Delete Subject</h1>
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
