import React from "react";
import { useInView } from "react-intersection-observer";

export const UserMobile = ({
 children,
 userName,
 place,
 total,
 setUserInfo,
}) => {
 const { ref, inView } = useInView();
 return (
  <button
   ref={ref}
   onClick={() => setUserInfo(userName)}
   className={`${place === 1 && "text-yellow-400"} ${
    place === 2 && "text-yellow-400"
   } ${place === 3 && "text-yellow-400"} ${
    place > 3 && place < 11 && "text-yellow-400"
   } ${
    place > 10 && place < 16 && "text-yellow-400"
   } px-2 py-1 bg-slate-600 text-slate-50 my-2 lg:m-2 w-full rounded-lg border-2 border-slate-5 h-8 flex justify-between items-center duration-700 ${
    inView
     ? "opacity-100 translate-y-0 animate-shake"
     : "opacity-0 -translate-y-5"
   }`}
  >
   <div className="flex items-center">
    <div>{children}</div>

    <i className="fa-solid fa-circle-info ml-3"></i>
   </div>
   <div>{total}</div>
  </button>
 );
};
