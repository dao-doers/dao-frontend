import * as yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export const dCKBTransferSchema = yup.object({
  amount: yup
    .number()
    .moreThan(0, 'Must be more than 0')
    .typeError('Must be a number')
    .required('Amount is required')
    // eslint-disable-next-line no-restricted-globals
    .transform(value => (isNaN(value) ? undefined : value))
    .nullable(),
  destinationAddress: yup
    .string()
    .matches(/^ckt.*$/, 'Must be a valid address')
    .required('Destination address is required')
    .min(50, 'Must be of the correct length')
    .nullable(),
});
