import styles from "../styles/Home.module.css";
import Head from "next/head";

export const Loading = () => {
 const phrases = [
  "Она произойдет выстрее выиграша Сэми Зейном мирового чемпионства.",
  "Выход Гробовщика в любом случае длится дольше.",
  "Доминик Мистерио провел в тюрьме примерно в 200 раз больше времени, чем длится самая долгая загрузка.",
  "Вы знали, что джоши Мизуки претендовала на главный титул 5 раз в течении 6 лет прежде чем выиграть его?",
 ];
 return (
  <div className="w-screen h-screen">
   <img
    src="https://i.ibb.co/k8n3t8K/photo-2023-03-01-21-27-32.jpg"
    alt="BG"
    className="w-full bg-cover fixed -z-10"
   />
   <div
    className={`w-full h-full min-h-screen bg-black bg-opacity-70 flex items-center justify-center`}
   >
    <div className={`${styles.ldsHourglass} `}></div>
    <div className={`text-white w-[20%] ml-5 text-2xl flex flex-col`}>
     <div className="mb-3 text-center">Дождитесь загрузки...</div>
     <div>{phrases[Math.floor(Math.random() * phrases.length)]}</div>
    </div>
   </div>
  </div>
 );
};
