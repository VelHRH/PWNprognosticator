import React from "react";
import { useInView } from "react-intersection-observer";

export const Total = ({ children }) => {
 const { ref, inView } = useInView();
 return (
  <div
   ref={ref}
   className={`p-1 bg-slate-800 flex items-center justify-center border-2 border-slate-100 text-slate-50 rounded-lg h-8 duration-700 ${
    inView
     ? "opacity-100 translate-y-0 animate-shake"
     : "opacity-0 -translate-y-5"
   }`}
  >
   {children}
  </div>
 );
};
