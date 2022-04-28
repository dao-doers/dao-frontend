import * as yup from 'yup';

const mintModalSchema = yup.object({
  amount: yup.number().moreThan(0, 'Must be more than 0').typeError('Must be a number').required('Amount is required'),
});

export default mintModalSchema;
