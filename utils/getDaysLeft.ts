export const getDaysLeft = (end: string): number => {
  const endDate = new Date(end);
  const today = new Date();

  // убираем часы, минуты и т.д. (чтобы считать только дни)
  endDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffTime = endDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays < 0 ? 0 : diffDays; // если проект уже закончился → 0
};