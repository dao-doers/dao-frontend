import { FC } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import DAOTile from 'components/DAOTile/DAOTile';
import TooltipIcon from 'components/TooltipIcon';
import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';

import { selectProposalStatus, setProposalStatus } from 'redux/slices/proposals';
import { setTransactionRecipe } from 'redux/slices/createProposal';
import { selectUserAddress } from 'redux/slices/user';

import FETCH_STATUSES from 'enums/fetchStatuses';

import useCreateProposal from 'hooks/useCreateProposal';

import newProposalSchema from 'validators/newProposalSchema';

import abiLibrary from 'lib/abi';

import displayBlockchainError from 'utils/displayBlockchainError';

const StyledBox = styled(Box)`
  width: 100%;
`;

const initialValues = {
  title: '',
  description: '',
  link: '',
  tributeOffered: 0,
};

const CreateProposalForm: FC = () => {
  const dispatch = useDispatch();
  const sendProposalStatus = useSelector(selectProposalStatus);
  const userAddress = useSelector(selectUserAddress);

  // MOCKED -----------------------------
  const version = 2;
  const daoAddress = process.env.DAO_ADDRESS;
  const lootRequested = 0;
  const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;
  const paymentRequested = 0;
  const paymentToken = process.env.TRIBUTE_TOKEN_ADDRESS;
  // MOCKED -----------------------------

  const onSubmit = async (values: any) => {
    try {
      dispatch(setProposalStatus(FETCH_STATUSES.LOADING));

      const modifiedLink = values.link.replace(/(^\w+:|^)\/\//, '');

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const receipt = await useCreateProposal(
        userAddress,
        abiLibrary,
        version,
        daoAddress as any,
        userAddress,
        values.tributeOffered,
        lootRequested,
        values.tributeOffered,
        tributeToken,
        paymentRequested,
        paymentToken,
        /* Details JSON */ {
          title: values.title,
          description: values.description,
          link: modifiedLink,
        },
      );

      dispatch(setTransactionRecipe(receipt));
      dispatch(setProposalStatus(FETCH_STATUSES.SUCCESS));
    } catch (error) {
      // console.log(displayBlockchainError(error.code));
      dispatch(setProposalStatus(FETCH_STATUSES.ERROR));
    }
  };

  const TypographyBold = styled(Typography)`
    font-weight: 600;
  `;

  return (
    <StyledBox>
      <Box maxWidth="500px" mx="auto">
        <TypographyBold variant="h4" mb={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          Create new proposal
        </TypographyBold>
        <Formik validationSchema={newProposalSchema} initialValues={initialValues} validateOnChange onSubmit={onSubmit}>
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
                      placeholder: 'https://',
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.link}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Tribute Offered"
                    tootltip="The amount of capital you are committing to deposit to the DAO bank. "
                    inputProps={{
                      id: 'tributeOffered',
                      placeholder: 'e.g. 10',
                      value: formik.values.tributeOffered,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.tributeOffered}
                  />
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Tribute Token:</Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    dCKB
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">CKB token to use for your tribute.</Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Shares Requested: </Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    {new Intl.NumberFormat('en-US').format(
                      // eslint-disable-next-line no-restricted-globals
                      isNaN(formik.values.tributeOffered) ? 0 : formik.values.tributeOffered,
                    )}
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">
                      Voting shares in the DAO. Shares are granted to members in order to allow them to vote on
                      proposals in the DAO. Shares also represent a claim on the tokens held in the DAO. Shares can
                      neither be exchanged or sold to other members of the DAO.
                    </Typography>
                  </TooltipIcon>
                </Box>

                <Box>
                  {userAddress === '' ? (
                    <ConnectWalletButton />
                  ) : (
                    <DAOButton
                      variant="gradientOutline"
                      type="submit"
                      isLoading={sendProposalStatus === FETCH_STATUSES.LOADING}
                      disabled={sendProposalStatus === FETCH_STATUSES.LOADING}
                    >
                      Submit proposal
                    </DAOButton>
                  )}
                </Box>

                {sendProposalStatus === FETCH_STATUSES.SUCCESS && (
                  <Box mt={2}>
                    <DAOTile variant="greenBackground">
                      <Typography p={2}>Congratulations! Your proposal has been submitted.</Typography>
                    </DAOTile>
                  </Box>
                )}

                {sendProposalStatus === FETCH_STATUSES.ERROR && (
                  <Box mt={2}>
                    <DAOTile variant="redOutline">
                      <Typography p={2}>Something went wrong. Please try again.</Typography>
                    </DAOTile>
                  </Box>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </StyledBox>
  );
};

export default CreateProposalForm;