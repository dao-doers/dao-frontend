const formatAddress = (address: string, firstDigits = 6, lastDigits = 5) => {
  if (address === null) {
    return '-';
  }

  if (address) {
    return `${address.substring(0, firstDigits)}...${address.substring(address.length - lastDigits)}`;
  }

  return '';
};

export default formatAddress;
