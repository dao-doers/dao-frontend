const formatAddress = (address: string) => {
  if (address === null) {
    return '-';
  }

  if (address) {
    return `${address.substring(0, 6)} . . . ${address.substring(address.length - 5)}`;
  }

  return '';
};

export default formatAddress;
