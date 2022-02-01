/* eslint-disable react-hooks/rules-of-hooks */
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

import abiLibrary from 'lib/abi';

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
    const user = '0xD173313A51f8fc37BcF67569b463abd89d81844f'; // @TODO replace to user connected with wallet
    const version = 2;
    const daoAddress = process.env.NEXT_PUBLIC_DAO_ADDRESS as string;
    // MOCKED -----------------------------

    /* send link without http or https */
    // const modifiedLink = link.value.replace(/(^\w+:|^)\/\//, '');

    // validations
    // if (!notNull(title.value, description.value, link.value)) return;
    // if (!memberToKick.validated) return;

    await useGuildKick(
      /* Wallet information */ user,
      /* Contract information */ abiLibrary,
      version,
      daoAddress,
      /* Proposal information */ values.memberToKick,
      /* Details JSON */ { title: values.title, description: values.description, link: values.link } as any,
    );

    setTimeout(() => dispatch(setProposalStatus(FETCH_STATUSES.SUCCESS)), 1000);
  };

  const TypographyBold = styled(Typography)`
    font-weight: 600;
  `;

  return (
    <StyledBox>
      <Box maxWidth="500px" mx="auto">
        <TypographyBold variant="h4" paragraph sx={{ display: { xs: 'none', md: 'block' } }}>
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
                    tootltip="Anything you believe is relevant to your proposal. The shorter the description the better, and the important piece here is the WHAT you are asking for and WHY."
                    inputProps={{
                      id: 'description',
                      value: formik.values.description,
                      onChange: formik.handleChange,
                      multiline: true,
                      rows: 3,
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
                    tootltip="Whatever information gives us the best context to review your proposal and make an informed decision."
                    inputProps={{
                      id: 'link',
                      value: formik.values.link,
                      onChange: formik.handleChange,
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
                    tootltip="A proposal to kick out a member of the DAO. Converts any Shares they may have into Loot, thereby removing voting power. Warning once a member is guildkicked, they become jailed and cannot be added as a member ever again."
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
