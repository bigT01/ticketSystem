export const sanitizeText = (input: string): string => {
  return input
    .replace(/[^a-zA-Zа-яА-Я\s]/g, '') // убираем цифры и символы, оставляем только буквы и пробелы
    .replace(/\s+/g, '_');             // заменяем пробелы на "_"
};