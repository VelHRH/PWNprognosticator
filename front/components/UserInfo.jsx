export const UserInfo = ({ users, name, setUserInfo }) => {
 return (
  <div className="w-full h-full fixed top-0 left-0 lg:hidden z-20">
   <div
    onClick={() => setUserInfo("")}
    className="w-full h-full bg-black opacity-70 fixed"
   ></div>
   <div className="w-[80%] rounded-lg bg-slate-50 opacity-100 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
    <div className="text-center font-bold text-2xl my-3">{name}</div>
    <div className="grid grid-cols-3 md:grid-cols-5 w-full justify-between gap-3 px-5 pb-5">
     {users
      .find((user) => user.user === name)
      ?.results.map((res, i) => (
       <div key={i} className="flex font-bold items-center">
        <div className="bg-slate-600 py-2 w-10 text-center text-slate-50 border-2 border-slate-600 rounded-l-md">
         {res.show}
        </div>
        <div className="text-slate-600 py-2 w-10 text-center border-2 border-slate-600 rounded-r-lg">
         {res.points}
        </div>
       </div>
      ))}
    </div>
   </div>
  </div>
 );
};
