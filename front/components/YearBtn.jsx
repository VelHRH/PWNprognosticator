import React from "react";

export const YearBtn = ({ children, changeYear, year }) => {
 return (
  <button
   onClick={() => changeYear(parseFloat(children))}
   className={`mx-3 ${
    year === parseFloat(children)
     ? "text-slate-50 bg-slate-600"
     : "bg-slate-50 hover:bg-slate-600 hover:text-slate-50 duration-300"
   } border-2 border-slate-600 text-xl px-2 py-1 rounded-md`}
  >
   {children}
  </button>
 );
};
