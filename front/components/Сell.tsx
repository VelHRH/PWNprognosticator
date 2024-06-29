import React from "react";
import { useInView } from "react-intersection-observer";

export const Cell = ({ children }: { children: string }) => {
 const { ref, inView } = useInView();
 return (
  <div
   ref={ref}
   className={`py-1 bg-slate-100 w-full h-8 rounded-lg flex items-center justify-center border-2 border-slate-900 duration-700 ${
    inView
     ? "opacity-100 translate-y-0 animate-shake"
     : "opacity-0 -translate-y-5"
   }`}
  >
   {children}
  </div>
 );
};
