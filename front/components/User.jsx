import React from "react";

export const User = ({ children, place }) => {
 return (
  <div
   className={`${place === 1 && "text-yellow-400"} ${
    place === 2 && "text-yellow-400"
   } ${place === 3 && "text-yellow-400"} ${
    place > 3 && place < 11 && "text-yellow-400"
   } ${
    place > 10 && place < 16 && "text-yellow-400"
   } px-2 py-1 bg-slate-600 text-slate-50 my-2 lg:m-2 w-full rounded-lg h-8 flex justify-between`}
  >
   <div>{children}</div>
  </div>
 );
};
