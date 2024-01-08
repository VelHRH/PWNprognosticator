import { useState } from 'react';

const postResults = async (show, data, year, secret) => {
  await fetch(`${process.env.NEXT_PUBLIC_API_HOST}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      show,
      data,
      password: secret,
    }),
  });
};

export const AddDataForm = () => {
  const [results, setResults] = useState('');
  const [show, setShow] = useState('');
  const [secret, setSecret] = useState('');
  const submitHandler = async e => {
    e.preventDefault();
    const data = results.split('\n');
    await postResults(show.slice(0, 3), data, 2023, secret);
  };
  return (
    <form
      onSubmit={e => submitHandler(e)}
      className="flex items-center ml-[50%] translate-x-[-50%]"
    >
      <div>
        <input
          value={show}
          onChange={e => setShow(e.target.value)}
          placeholder="Название шоу"
          className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
        ></input>
        <input
          value={secret}
          onChange={e => setSecret(e.target.value)}
          placeholder="Секретный код"
          className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
        ></input>
      </div>
      <textarea
        cols="50"
        rows="10"
        placeholder="Данные..."
        value={results}
        onChange={e => setResults(e.target.value)}
        className="border-4 border-slate-900 focus:outline-none rounded-2xl mx-5 p-2"
      ></textarea>
      <button
        className={`bg-slate-900 border-slate-900 hover:bg-slate-50 hover:text-slate-900 mx-5 p-3 border-2 duration-300 text-slate-50`}
      >
        Отправить
      </button>
    </form>
  );
};
