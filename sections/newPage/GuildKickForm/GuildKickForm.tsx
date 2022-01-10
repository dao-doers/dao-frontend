import { FC } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';

import { selectProposalStatus, setProposalStatus } from 'redux/slices/proposals';

import FETCH_STATUSES from 'enums/fetchStatuses';

import useGuildKick from 'hooks/useGuildKick';

import guildKickSchema from 'validators/guildKickSchema';

import { abiLibrary } from 'lib/abi.js';

const StyledBox = styled(Box)`
  width: 100%;
`;

const initialValues = {
  title: '',
  description: '',
  link: '',
  memberToKick: '',
};

const GuildKickForm: FC = () => {
  const dispatch = useDispatch();
  const sendProposalStatus = useSelector(selectProposalStatus);

  const onSubmit = async (values: any) => {
    dispatch(setProposalStatus(FETCH_STATUSES.LOADING));

    // MOCKED -----------------------------
    const user = '0xD173313A51f8fc37BcF67569b463abd89d81844f';
    const version = 2;
    const daoAddress = '0xb252c90a042b2e698791b9bcab26fc5a1e8a241a';
    // MOCKED -----------------------------

    /* send link without http or https */
    // const modifiedLink = link.value.replace(/(^\w+:|^)\/\//, '');

    // validations
    // if (!notNull(title.value, description.value, link.value)) return;
    // if (!memberToKick.validated) return;

    await useGuildKick(
      /*Wallet information*/ user,
      /*Contract information*/ abiLibrary,
      version,
      daoAddress,
      /*Proposal information*/ values.memberToKick,
      /* Details JSON */ { title: values.title, description: values.description, link: values.link },
    );

    setTimeout(() => dispatch(setProposalStatus(FETCH_STATUSES.SUCCESS)), 1000);
  };

  const TypographyBold = styled(Typography)`
    font-weight: 600;
  `;

  return (
    <StyledBox>
      <Box maxWidth="500px" mx="auto">
        <TypographyBold variant="h4" paragraph>
          Create new proposal
        </TypographyBold>
        <Formik validationSchema={guildKickSchema} initialValues={initialValues} validateOnChange onSubmit={onSubmit}>
          {formik => (
            <Form>
              <Box width="100%">
                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Title"
                    inputProps={{
                      id: 'title',
                      value: formik.values.title,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.title}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Description"
                    inputProps={{
                      id: 'description',
                      value: formik.values.description,
                      onChange: formik.handleChange,
                      multiline: true,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.description}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Link"
                    inputProps={{
                      id: 'link',
                      value: formik.values.link,
                      onChange: formik.handleChange,
                      multiline: true,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.link}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Member"
                    tootltip="TODO: add tooltip text"
                    inputProps={{
                      id: 'memberToKick',
                      value: formik.values.memberToKick,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.memberToKick}
                  />
                </Box>

                <Box>
                  <DAOButton
                    variant="gradientOutline"
                    type="submit"
                    isLoading={sendProposalStatus === FETCH_STATUSES.LOADING}
                    disabled={sendProposalStatus === FETCH_STATUSES.LOADING}
                  >
                    Submit proposal
                  </DAOButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </StyledBox>
  );
};

export default GuildKickForm;
