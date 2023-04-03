import styles from "../styles/Home.module.css";

export const Loading = ({ phrase, isBlack }) => {
 return (
  <div
   className={`flex items-center justify-center my-16 w-[80%] justify-items-center ml-[50%] translate-x-[-50%]`}
  >
   <div
    className={`${
     isBlack ? styles.ldsHourglassWhite : styles.ldsHourglassBlack
    }`}
   ></div>
   <div
    className={`md:w-[25%] ml-5 text-xl text-black dark:text-white flex flex-col`}
   >
    <div className="mb-3 text-2xl">Дождитесь загрузки...</div>
    <div>{phrase}</div>
   </div>
  </div>
 );
};
