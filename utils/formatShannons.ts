export const shannonsToCkb = (shannons: number) => {
  const ckb = shannons / 100000000;
  return ckb;
};

export const ckbToShannons = (ckb: number) => {
  const shannons = ckb * 100000000;
  return shannons;
};
