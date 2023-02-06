import React from "react";

export const UserMobile = ({
 children,
 userName,
 place,
 total,
 setUserInfo,
}) => {
 return (
  <button
   onClick={() => setUserInfo(userName)}
   className={`${place === 1 && "bg-amber-400 text-slate-50"} ${
    place === 2 && "bg-slate-400 text-slate-50"
   } ${place === 3 && "bg-orange-700 text-slate-50"} ${
    place > 3 && place < 11 && "bg-teal-300 text-slate-50"
   } ${
    place > 10 && place < 16 && "bg-purple-400 text-slate-50"
   } px-2 py-1 bg-slate-600 text-slate-50 my-2 lg:m-2 w-full rounded-lg h-8 flex justify-between`}
  >
   <div>{children}</div>
   <div>{total}</div>
  </button>
 );
};
