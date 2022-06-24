import * as yup from 'yup';

// import './isAddress';

const newFundingSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required'),
  link: yup.string().required('Link is required'),
  // applicant: yup.string().required('Address is required'),
  tributeOffered: yup
    .number()
    .integer()
    .min(0)
    .required('You must specify an amount as a tribute for considering your proposal.'),
  paymentRequested: yup.number().integer().moreThan(0, 'Must be more than 0').required('Amount is required'),
});

export default newFundingSchema;
