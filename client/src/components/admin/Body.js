import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import Calendar from "react-calendar";
import EngineeringIcon from "@mui/icons-material/Engineering";
import BoyIcon from "@mui/icons-material/Boy";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import "react-calendar/dist/Calendar.css";
import { useSelector } from "react-redux";
import Notice from "../notices/Notice";
import ShowNotice from "../notices/ShowNotice";
import ReplyIcon from "@mui/icons-material/Reply";
const Body = () => {
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState({});
  const notices = useSelector((state) => state.admin.notices.result);
  const [value, onChange] = useState(new Date());
  const students = useSelector((state) => state.admin.allStudent);
  const faculties = useSelector((state) => state.admin.allFaculty);
  const admins = useSelector((state) => state.admin.allAdmin);
  const departments = useSelector((state) => state.admin.allDepartment);

  return (
    <div className="flex-1 min-w-0 mt-3">
      <div className="space-y-5">
        <div className="flex text-muted items-center space-x-2">
          <HomeIcon />
          <h1>Dashboard</h1>
        </div>
        <div className="flex flex-col md:mr-5 space-y-4 overflow-y-auto">
          <div className="surface-card rounded-xl shadow-lg grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 md:px-8 py-4">
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/10">
              <EngineeringIcon
                className="rounded-full p-2 bg-white/5 border border-white/10 text-indigo-200"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Faculty</h1>
                <h2 className="text-2xl font-bold">{faculties?.length}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/10">
              <BoyIcon
                className="rounded-full p-2 bg-white/5 border border-white/10 text-violet-200"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Student</h1>
                <h2 className="text-2xl font-bold">{students?.length}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4 md:border-r md:border-white/10">
              <SupervisorAccountIcon
                className="rounded-full p-2 bg-white/5 border border-white/10 text-sky-200"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Admin</h1>
                <h2 className="text-2xl font-bold">{admins?.length}</h2>
              </div>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <MenuBookIcon
                className="rounded-full p-2 bg-white/5 border border-white/10 text-indigo-200"
                sx={{ fontSize: 40 }}
              />
              <div className="flex flex-col">
                <h1>Department</h1>
                <h2 className="text-2xl font-bold">{departments?.length}</h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-col space-y-4 w-full md:w-2/6">
              <div className="surface-card min-h-[17rem] md:h-[17rem] rounded-xl shadow-lg p-2">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="surface-card min-h-[17rem] md:h-[17rem] w-full rounded-xl shadow-lg flex flex-col pt-3">
              <div className="flex px-3">
                {open && (
                  <ReplyIcon
                    onClick={() => setOpen(false)}
                    className="cursor-pointer text-white/70 hover:text-white"
                  />
                )}
                <h1 className="font-bold text-xl w-full text-center">
                  Notices
                </h1>
              </div>
              <div className="mx-4 sm:mx-5 mt-5 space-y-3 overflow-y-auto max-h-[16rem] md:h-[12rem]">
                {!open ? (
                  notices?.map((notice, idx) => (
                    <div
                      onClick={() => {
                        setOpen(true);
                        setOpenNotice(notice);
                      }}
                      className="">
                      <Notice idx={idx} notice={notice} notFor="" />
                    </div>
                  ))
                ) : (
                  <ShowNotice notice={openNotice} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
