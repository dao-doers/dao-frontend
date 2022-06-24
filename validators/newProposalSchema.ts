import * as yup from 'yup';

const newProposalSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required'),
  // TODO: uncomment after types errors are fixed
  // applicant: yup.string().required('Address is required').metamaskAddress('Address is not valid'),
  link: yup.string().required('Link is required'),
  tributeOffered: yup
    .number()
    .integer()
    .moreThan(0, 'Must be more than 0')
    .required('You must specify an amount as a tribute for considering your proposal.'),
  sharesRequested: yup
    .number()
    .integer()
    .moreThan(0, 'Must be more than 0')
    .required('You must specify an amount as a tribute for considering your proposal.'),
});

export default newProposalSchema;
