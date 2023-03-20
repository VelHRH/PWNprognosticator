import styles from "../styles/Home.module.css";
import Head from "next/head";

export const Loading = ({ phrase }) => {
 return (
  <div className={`flex items-center justify-center mt-10`}>
   <div className={`${styles.ldsHourglass} `}></div>
   <div className={`text-white w-[20%] ml-5 text-xl flex flex-col`}>
    <div className="mb-3 text-2xl">Дождитесь загрузки...</div>
    <div>{phrase}</div>
   </div>
  </div>
 );
};
