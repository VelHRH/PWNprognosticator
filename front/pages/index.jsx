import Head from "next/head";
import { useState } from "react";
import { User } from "../components/User";
import { UserMobile } from "../components/UserMobile";
import { Total } from "../components/Total";
import { YearBtn } from "../components/YearBtn";
import { Cell } from "../components/Сell";
import { UserInfo } from "../components/UserInfo";
import { AddDataForm } from "../components/AddDataForm";

const getAll = async (year) => {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${year}`);
 return res.json();
};

export const getStaticProps = async () => {
 const users = await getAll(2023);
 return {
  props: {
   users,
  },
  revalidate: 600,
 };
};

const Home = ({ users }) => {
 const [search, setSearch] = useState("");
 const [userInfo, setUserInfo] = useState("");
 const [darkTheme, setDarkTheme] = useState(true);

 const mostShowsUser = () => {
  let maxUser = { results: [] };
  for (let i = 0; i < users.length; i++) {
   if (users[i].results.length > maxUser.results.length) {
    maxUser = users[i];
   }
  }
  return maxUser;
 };

 function sumArray(array) {
  let sum = 0;
  for (const item of array) {
   sum += item.points;
  }
  return sum;
 }

 return (
  <>
   <Head>
    <title>Прогнозист</title>
    <meta name="description" content="Результаты 'Прогнозиста' PWNews" />
    <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0, maximum-scale=1"
    />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <div className={`${darkTheme ? "dark" : ""}`}>
    {darkTheme && (
     <img
      src="https://spaziowrestling.it/wp-content/uploads/2023/06/9855545545.jpg"
      alt="BG"
      class="h-screen w-full object-cover fixed -z-10"
     />
    )}
    <div
     className={`w-full h-full  min-h-screen ${
      darkTheme && "bg-black bg-opacity-90"
     }`}
    >
     {userInfo !== "" && (
      <UserInfo name={userInfo} setUserInfo={setUserInfo} users={users} />
     )}
     {process.env.NODE_ENV === "development" && <AddDataForm />}
     <div className="w-full flex justify-center pt-5">
      <YearBtn>2023</YearBtn>
      <div
       onClick={() => setDarkTheme((prev) => !prev)}
       className={`p-2 rounded-lg bg-slate-600 cursor-pointer hover:bg-slate-700 transition`}
      >
       {darkTheme ? (
        <i className="fa-solid fa-sun text-slate-100" />
       ) : (
        <i className="fa-solid fa-moon text-slate-100" />
       )}
      </div>
     </div>
     <div
      className={`text-center italic mt-3 lg:hidden ${
       darkTheme ? "text-white" : "text-black"
      }`}
     >
      (нажмите на пользователя для просмотра баллов)
     </div>
     <div className="hidden lg:block w-full mt-5 font-bold">
      <div className="w-full flex mb-1">
       <input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-2 py-1 ml-2 w-f15 rounded-lg border-2 border-slate-600"
       ></input>
       <div className="flex flex-1 w-full">
        {mostShowsUser()?.results.map((show, i) => (
         <div key={i} className={`w-2023 pl-2`}>
          <div className="bg-slate-300 py-1 w-full rounded-lg text-center border-2 border-slate-900">
           {show.show}
          </div>
         </div>
        ))}
        <div className="w-2023 pl-2">
         <div
          className={`py-1 w-full bg-slate-800 text-slate-50 text-center rounded-lg border-2 border-slate-100`}
         >
          Всего
         </div>
        </div>
       </div>
      </div>

      <div className="w-full flex">
       <div className="w-f15">
        {users.map((user, i) =>
         search === "" ? (
          <User key={i} place={i + 1}>
           {i + 1 + ". " + user.user}
          </User>
         ) : (
          user.user.slice(0, search.length).toUpperCase() ===
           search.toUpperCase() && (
           <User key={i} place={i + 1}>
            {i + 1 + ". " + user.user}
           </User>
          )
         )
        )}
       </div>
       <div className="flex-1 flex w-full">
        {mostShowsUser()?.results.map((show, i) => (
         <div key={i} className="w-2023 pl-2">
          {users.map((user, i) =>
           search === "" ? (
            <Cell key={i}>
             {
              user.results[user.results.map((u) => u.show).indexOf(show.show)]
               ?.points
             }
            </Cell>
           ) : (
            user.user.slice(0, search.length).toUpperCase() ===
             search.toUpperCase() && (
             <Cell key={i}>
              {
               user.results[user.results.map((u) => u.show).indexOf(show.show)]
                ?.points
              }
             </Cell>
            )
           )
          )}
         </div>
        ))}
        <div className="w-2023 ml-2">
         {users.map((user) =>
          search === "" ? (
           <div key={user.user} className="my-2 pl-2">
            <Total>{sumArray(user.results)}</Total>
           </div>
          ) : (
           user.user.slice(0, search.length).toUpperCase() ===
            search.toUpperCase() && (
            <div key={user.user} className="my-2 pl-2">
             <Total>{sumArray(user.results)}</Total>
            </div>
           )
          )
         )}
        </div>
       </div>
      </div>
     </div>
     <div className="lg:hidden w-full">
      <div className="w-full px-2 font-bold mt-5">
       <input
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-2 py-1 w-full rounded-lg border-2 border-slate-600"
       ></input>
       {users.map((user, i) =>
        search === "" ? (
         <UserMobile
          setUserInfo={setUserInfo}
          key={i}
          userName={user.user}
          place={i + 1}
          total={sumArray(user.results)}
         >
          {i + 1 + ". " + user.user}
         </UserMobile>
        ) : (
         user.user.slice(0, search.length).toUpperCase() ===
          search.toUpperCase() && (
          <UserMobile
           setUserInfo={setUserInfo}
           key={i}
           userName={user.user}
           place={i + 1}
           total={sumArray(user.results)}
          >
           {i + 1 + ". " + user.user}
          </UserMobile>
         )
        )
       )}
      </div>
     </div>
    </div>
   </div>
  </>
 );
};

export default Home;
