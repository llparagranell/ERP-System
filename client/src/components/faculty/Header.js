import React from "react";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login/facultylogin");
  };

  return (
    <div className="flex-[0.05] flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 gap-3">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg btn-brand flex items-center justify-center text-lg shadow-lg shadow-indigo-500/20">
          🎓
        </div>
        <h1 className="font-extrabold text-sm tracking-wide">
          Edu<span className="brand-text">ERP</span>
        </h1>
      </div>
      <h1 className="hidden sm:block font-semibold text-muted">Welcome</h1>
      <div className="flex items-center gap-2 sm:gap-3 text-sm min-w-0">
        <Avatar
          src={user?.result?.avatar}
          alt={(user?.result?.name || "U").charAt(0)}
          sx={{ width: 24, height: 24 }}
          className="border-white/15 border-2"
        />
        <h1 className="text-white/90 truncate max-w-[7.5rem] sm:max-w-[10rem]">
          {(user?.result?.name || "").split(" ")[0]}
        </h1>
        <LogoutIcon
          onClick={logout}
          className="cursor-pointer hover:scale-110 transition-all text-white/70 hover:text-white"
        />
      </div>
    </div>
  );
};

export default Header;

