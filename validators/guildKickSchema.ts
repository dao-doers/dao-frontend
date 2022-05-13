import * as yup from 'yup';

const guildKickSchema = yup.object({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(3, 'Description must be at least 3 characters').required('Description is required'),
  memberToKick: yup.string().required('Member address is required'),
});

export default guildKickSchema;
