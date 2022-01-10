import * as yup from 'yup';

const newProposalSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  link: yup.string().required('Link is required'),
  tributeOffered: yup
    .number()
    .moreThan(0, 'Must be more than 0')
    .typeError('Must be a number')
    .required('Amount is required'),
});

export default newProposalSchema;
