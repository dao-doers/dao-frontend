const notNull = (...args: any) => {
  let validated = true;
  args.forEach((a: string) => {
    if (a === '0x0' || a === '') validated = false;
  });
  return validated;
};

export default notNull;
