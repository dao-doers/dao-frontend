import * as yup from 'yup';

const withdrawUnlockedTokensSchema = yup.object({
  amount: yup.number().integer().min(0),
});

export default withdrawUnlockedTokensSchema;
