import React from "react";

export const User = ({ children, place }) => {
 return (
  <div
   className={`${place === 1 && "bg-amber-400 text-slate-900"} ${
    place === 2 && "bg-slate-400 text-slate-900"
   } ${place === 3 && "bg-orange-700 text-slate-50"} ${
    place > 3 && place < 11 && "bg-teal-300 text-slate-900"
   } ${
    place > 10 && place < 16 && "bg-purple-400 text-slate-900"
   } px-2 py-1 bg-slate-600 text-slate-50 m-2 w-full rounded-lg h-8`}
  >
   {children}
  </div>
 );
};
