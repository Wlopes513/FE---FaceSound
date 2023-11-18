export const cpfMask = (value) => {
  if (value) {
    let valueString = value.toString();
    valueString = valueString
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');

    return valueString;
  }

  return value;
};

export const phoneMask = (value) => {
  if (value) {
    const valueString = value.toString();
    const formatNumber = valueString.length === 11 ? valueString.match(/(\d{2})(\d{5})(\d{4})/) : valueString.match(/(\d{2})(\d{4})(\d{4})/);
    const finalNumber = `(${formatNumber[1]}) ${formatNumber[2]}-${formatNumber[3]}`;

    return finalNumber;
  }

  return value;
};

export const moneyMask = (value) => {
  let val = value;
  val = value.replace('.', '').replace(',', '').replace(/\D/g, '');

  const options = { minimumFractionDigits: 2 };
  const result = new Intl.NumberFormat('pt-BR', options).format(
    parseFloat(val) / 100,
  );

  return `R$ ${result}`;
};
