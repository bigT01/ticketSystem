const getProgressDateToday = (start: string, end: string): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const today = new Date();

  // убираем часы, чтобы считать только дни
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const totalTime = endDate.getTime() - startDate.getTime();
  const passedTime = today.getTime() - startDate.getTime();

  // если сегодня раньше старта
  if (passedTime < 0) return 0;
  // если уже после дедлайна
  if (today > endDate) return 100;

  const percent = (passedTime / totalTime) * 100;
  return Math.round(percent); // округляем
};

export default getProgressDateToday;