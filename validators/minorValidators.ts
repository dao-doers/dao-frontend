import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const dCKBTransferSchema = yup.object({
  amount: yup.number().moreThan(0, 'Must be more than 0').typeError('Must be a number').required('Amount is required'),
});
