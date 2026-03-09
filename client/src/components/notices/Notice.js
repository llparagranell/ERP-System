import React from "react";

const Notice = ({ notice, notFor }) => {
  if (notFor === notice.noticeFor) return null;

  return (
    <div className="surface-card flex items-center gap-3 py-2 px-3 rounded-lg border border-white/10 hover:border-indigo-500/25 hover:bg-white/5 transition-all duration-200 cursor-pointer h-10">
      <span className="text-white/45">•</span>
      <h1 className="font-semibold overflow-hidden text-ellipsis w-[15rem]">
        {notice.topic}
      </h1>
      <p className="text-muted text-ellipsis w-[25rem] overflow-hidden">
        {notice.content}
      </p>
    </div>
  );
};

export default Notice;
