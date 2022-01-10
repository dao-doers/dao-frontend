import * as yup from 'yup';

const guildKickSchema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  link: yup.string().required('Link is required'),
  memberToKick: yup.string().required('Member address is required'),
});

export default guildKickSchema;
