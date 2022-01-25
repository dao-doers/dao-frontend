import * as yup from 'yup';

const newProposalSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required'),
  link: yup.string().required('Link is required'),
  tributeOffered: yup
    .number()
    .moreThan(0, 'Must be more than 0')
    .typeError('Must be a number')
    .required('Amount is required'),
});

export default newProposalSchema;
