import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AddDataForm } from '../components/AddDataForm';
import { YearBtn } from '../components/YearBtn';
import { generateYears } from '../utils/generateYears';

const Layout = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Прогнозист</title>
        <meta name="description" content="Результаты 'Прогнозиста' PWNews" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {darkTheme && (
        <img
          src="https://i.ibb.co/HCVDr51/2024-wwe-crown-jewel-official-poster-v0-br1ozeg3cctd1.webp"
          alt="BG"
          className="h-screen w-full object-cover fixed -z-10"
        />
      )}
      <div className={`w-full h-full px-2 min-h-screen ${darkTheme && 'bg-black bg-opacity-80'}`}>
        {process.env.NODE_ENV === 'development' && <AddDataForm />}
        <div className="w-full flex justify-center pt-5 gap-2">
          {generateYears().map(year => (
            <YearBtn
              active={
                !router.query.year
                  ? year === new Date().getFullYear()
                  : year.toString() === router.query.year
              }
            >
              {year}
            </YearBtn>
          ))}
          <div
            onClick={() => setDarkTheme(prev => !prev)}
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
          className={`text-center italic mt-3 lg:hidden ${darkTheme ? 'text-white' : 'text-black'}`}
        >
          (нажмите на пользователя для просмотра баллов)
        </div>
        {children}
      </div>
    </>
  );
};

export default Layout;
