export const generateYears = () => {
  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index,
  );
  return yearsArray;
};
