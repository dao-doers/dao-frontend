const isMember = async (
  memberPolyAddress: any,
  /*  const dao = await new web3.eth.Contract(abiLibrary.moloch2, contractAddress); */
  dao: any,
) => {
  const response = await dao.methods.members(memberPolyAddress).call({}, (err: any, res: any) => {
    console.log('call', {
      err,
      res,
    });
    if (err) {
      console.error(err);
      return err;
    }
    return res;
  });
  return response.exists;
};

export default isMember;
