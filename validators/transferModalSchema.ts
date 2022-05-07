import * as yup from 'yup';

// import './isAddress';

const transferModalSchema = yup.object({
  receiverAddress: yup
    .string()
    .min(42, 'Address must have 42 characters')
    .max(42, 'Address must have 42 characters')
    .required('Title is required'),
  amount: yup.number().moreThan(0, 'Must be more than 0').typeError('Must be a number').required('Amount is required'),
});

export default transferModalSchema;
