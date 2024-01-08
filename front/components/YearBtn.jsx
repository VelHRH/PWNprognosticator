import Link from 'next/link';

export const YearBtn = ({ children, active }) => {
  return (
    <Link
      href={`/${children === new Date().getFullYear() ? '' : children}`}
      className={`${
        active
          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          : 'bg-slate-600 text-slate-50 hover:bg-slate-700'
      } border-2 border-slate-600 text-xl px-2 py-1 rounded-md`}
    >
      {children}
    </Link>
  );
};
