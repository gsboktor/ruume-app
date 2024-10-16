export const phoneNumberFormatter = (value: string) => {
//   const cleaned = value.replace(/\D/g, '');
  const match = value.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return value;
};
