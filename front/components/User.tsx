import React from "react";
import { useInView } from "react-intersection-observer";

export const User = ({
 children,
 place,
}: {
 children: string;
 place: number;
}) => {
 const { ref, inView } = useInView();
 return (
  <div
   ref={ref}
   className={`${place === 1 && "text-yellow-400"} ${
    place === 2 && "text-yellow-400"
   } ${place === 3 && "text-yellow-400"} ${
    place > 3 && place < 11 && "text-yellow-400"
   } ${
    place > 10 && place < 16 && "text-yellow-400"
   } px-2 py-1 bg-slate-600 text-slate-50 my-2 lg:m-2 duration-700 w-full shadow-lg items-center border-2 border-slate-50 rounded-lg h-8 flex justify-between ${
    inView
     ? "opacity-100 translate-y-0 animate-shake"
     : "opacity-0 -translate-y-5"
   }`}
  >
   {children.length > 24 ? `${children.slice(0, 22)}...` : children}
  </div>
 );
};
