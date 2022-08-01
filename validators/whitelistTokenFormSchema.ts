import * as yup from 'yup';

const whitelistTokenFormSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required'),
  link: yup.string(),
  tokenAddress: yup.string().required('Token address is required'),
});

export default whitelistTokenFormSchema;
