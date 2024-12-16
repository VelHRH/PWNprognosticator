import { useState } from 'react';
import Layout from '../components/Layout';
import { Total } from '../components/Total';
import { User } from '../components/User';
import { UserInfo } from '../components/UserInfo';
import { UserMobile } from '../components/UserMobile';
import { Cell } from '../components/Сell';

const getAll = async year => {
  const fetchSourse = `${process.env.NEXT_PUBLIC_API_HOST}/${year}`;
  console.log(fetchSourse);
  const res = await fetch(fetchSourse);
  return res.json();
};

export const getStaticProps = async () => {
  const users = await getAll(new Date().getFullYear());
  return {
    props: {
      users,
    },
    revalidate: 600,
  };
};

export default function Home({ users }) {
  const [search, setSearch] = useState('');
  const [userInfo, setUserInfo] = useState('');
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
    <Layout>
      {userInfo !== '' && <UserInfo name={userInfo} setUserInfo={setUserInfo} users={users} />}
      <div className="hidden lg:block w-full mt-5 font-bold">
        <div className="w-full flex mb-3 gap-2">
          <input
            placeholder="Поиск..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-f15 rounded-lg border-2 border-slate-600 p-1"
          ></input>
          <div className="flex flex-1 w-full gap-2">
            {mostShowsUser()?.results.map(show => (
              <div className="bg-slate-300 w-2023 rounded-lg border-2 border-slate-900 flex items-center justify-center" key={show.show}>
                {show.show === 'Mit' ? 'MitB' : show.show === 'KQo' ? 'KQoR' : show.show === 'SNM' ? "SNME" : show.show}
              </div>
            ))}
            <div className="w-2023">
              <div
                className={`p-1 bg-slate-800 flex items-center justify-center text-slate-50 rounded-lg border-2 border-slate-100`}
              >
                Всего
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex gap-2">
          <div className="w-f15 flex flex-col gap-2">
            {users.map((user, i) =>
              search === '' ? (
                <User key={i} place={i + 1}>
                  {i + 1 + '. ' + user.user}
                </User>
              ) : (
                user.user.slice(0, search.length).toUpperCase() === search.toUpperCase() && (
                  <User key={i} place={i + 1}>
                    {i + 1 + '. ' + user.user}
                  </User>
                )
              ),
            )}
          </div>
          <div className="flex-1 flex w-full gap-2">
            {mostShowsUser()?.results.map((show, i) => (
              <div key={i} className="w-2023 flex flex-col gap-2">
                {users.map((user, i) =>
                  search === '' ? (
                    <Cell key={i}>
                      {user.results[user.results.map(u => u.show).indexOf(show.show)]?.points}
                    </Cell>
                  ) : (
                    user.user.slice(0, search.length).toUpperCase() === search.toUpperCase() && (
                      <Cell key={i}>
                        {user.results[user.results.map(u => u.show).indexOf(show.show)]?.points}
                      </Cell>
                    )
                  ),
                )}
              </div>
            ))}
            <div className="w-2023 flex flex-col gap-2">
              {users.map(user =>
                search === '' ? (
                  <Total>{sumArray(user.results)}</Total>
                ) : (
                  user.user.slice(0, search.length).toUpperCase() === search.toUpperCase() && (
                    <Total>{sumArray(user.results)}</Total>
                  )
                ),
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
            onChange={e => setSearch(e.target.value)}
            className="px-2 py-1 w-full rounded-lg border-2 border-slate-600"
          ></input>
          {users.map((user, i) =>
            search === '' ? (
              <UserMobile
                setUserInfo={setUserInfo}
                key={i}
                userName={user.user}
                place={i + 1}
                total={sumArray(user.results)}
              >
                {i + 1 + '. ' + user.user}
              </UserMobile>
            ) : (
              user.user.slice(0, search.length).toUpperCase() === search.toUpperCase() && (
                <UserMobile
                  setUserInfo={setUserInfo}
                  key={i}
                  userName={user.user}
                  place={i + 1}
                  total={sumArray(user.results)}
                >
                  {i + 1 + '. ' + user.user}
                </UserMobile>
              )
            ),
          )}
        </div>
      </div>
    </Layout>
  );
}
