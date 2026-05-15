import React from "react";

const Notice = ({ notice, notFor }) => {
  if (notFor === notice.noticeFor) return null;

  return (
    <div className="surface-card flex items-center gap-3 py-2 px-3 rounded-lg border border-white/10 hover:border-indigo-500/25 hover:bg-white/5 transition-all duration-200 cursor-pointer">
      <span className="text-white/45">•</span>
      <h1 className="font-semibold truncate flex-1 min-w-0">{notice.topic}</h1>
      <p className="hidden sm:block text-muted truncate flex-[2] min-w-0">
        {notice.content}
      </p>
    </div>
  );
};

export default Notice;
