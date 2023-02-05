import Head from "next/head";
import { useState } from "react";
import { useQuery, QueryClient, dehydrate, useMutation } from "react-query";
import { User } from "../components/User";
import { Total } from "../components/Total";
import { YearBtn } from "../components/YearBtn";

const postResults = async (show, data, year) => {
 await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${year}`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json;charset=utf-8",
  },
  body: JSON.stringify({
   show,
   data,
  }),
 });
};

const getAll = async (year) => {
 const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/${year}`);
 return res.json();
};

export const getStaticProps = async () => {
 const queryClient = new QueryClient();
 await queryClient.prefetchQuery(["users", 2023], getAll(2023));

 return {
  props: { dehydratedState: dehydrate(queryClient) },
 };
};

export default function Home() {
 const [results, setResults] = useState("");
 const [show, setShow] = useState("");
 const [secret, setSecret] = useState("");
 const [postStatus, setPostStatus] = useState("none");
 const [year, setYear] = useState(2023);

 const users = useQuery(["users", year], () => getAll(year));

 const starMutation = useMutation(async (req) => {
  await postResults(req.show.slice(0, 3), req.data, req.year);
  await users.refetch();
 });

 const submitHandler = (e) => {
  e.preventDefault();
  if (secret == process.env.NEXT_PUBLIC_SECRET) {
   setPostStatus("success");
   const data = results.split("\n");
   starMutation.mutate({ show, data, year });
  } else {
   setPostStatus("fail");
  }
 };

 const mostShowsUser = () => {
  let maxUser = { results: [] };
  for (let i = 0; i < users.data.length; i++) {
   if (users.data[i].results.length > maxUser.results.length) {
    maxUser = users.data[i];
   }
  }
  return maxUser;
 };

 const changeYear = async (year) => {
  setYear(year);
  await users.refetch();
 };

 function sumArray(array) {
  let sum = 0;
  for (const item of array) {
   sum += item.points;
  }
  return sum;
 }

 if (users.isLoading) return <div>Loading...</div>;
 if (users.isError) return <div>Error: {users.error}</div>;
 return (
  <>
   <Head>
    <title>Прогнозист</title>
    <meta name="description" content="PWNews prognosticator results" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />
   </Head>
   {process.env.NODE_ENV === "development" && (
    <form
     onSubmit={(e) => submitHandler(e)}
     className="flex items-center ml-[50%] translate-x-[-50%]"
    >
     <div>
      <input
       value={show}
       onChange={(e) => setShow(e.target.value)}
       placeholder="Название шоу"
       className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
      ></input>
      <input
       value={secret}
       onChange={(e) => setSecret(e.target.value)}
       placeholder="Секретный код"
       className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
      ></input>
     </div>
     <textarea
      cols="50"
      rows="10"
      placeholder="Данные..."
      value={results}
      onChange={(e) => setResults(e.target.value)}
      className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
     ></textarea>
     <button
      className={`${
       postStatus === "none"
        ? "bg-slate-900 border-slate-900 hover:bg-slate-50 hover:text-slate-900"
        : postStatus === "success"
        ? "bg-green-600 border-green-600"
        : "bg-red-600 border-red-600"
      } mx-5 p-3 border-2 duration-300 text-slate-50`}
     >
      Отправить
     </button>
    </form>
   )}
   <div className="w-[1500px] xl:w-full mt-6 flex justify-center">
    <YearBtn changeYear={changeYear} year={year}>
     2023
    </YearBtn>
   </div>
   <div className="w-[1500px] lg:w-full mt-5">
    <div className="w-full flex mb-1">
     <div className="px-2 py-1 bg-transparent text-transparent ml-2 w-[15%] rounded-lg"></div>
     <div className="flex flex-1 ml-2">
      {mostShowsUser()?.results.map((show, i) => (
       <div key={i} className={`w-[calc(100%/12.8)] pr-2`}>
        <div className="bg-slate-300 py-1 rounded-lg text-center md:h-8">
         {show.show}
        </div>
       </div>
      ))}
      <div className="w-[calc(100%/13)] pr-2">
       <Total>Всего</Total>
      </div>
     </div>
    </div>
    <div className="w-full flex">
     <div className="w-[15%]">
      {users.data.map((user, i) => (
       <User key={i} place={i + 1}>
        {i + 1 + ". " + user.user}
       </User>
      ))}
     </div>
     <div className="flex-1 flex">
      {mostShowsUser()?.results.map((show, i) => (
       <div key={i} className="w-[calc(100%/13)] pl-2">
        {users.data.map((user, i) => (
         <div
          key={i}
          className="py-1 bg-slate-100 w-full h-8 m-2 rounded-lg text-center"
         >
          {
           user.results[user.results.map((u) => u.show).indexOf(show.show)]
            ?.points
          }
         </div>
        ))}
       </div>
      ))}
      <div className="w-[calc(100%/13)] ml-2">
       {users.data.map((user) => (
        <div key={user.user} className="my-2 pl-2">
         <Total>{sumArray(user.results)}</Total>
        </div>
       ))}
      </div>
     </div>
    </div>
   </div>
  </>
 );
}
