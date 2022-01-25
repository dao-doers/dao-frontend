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

import { selectProposalStatus, setProposalStatus } from 'redux/slices/proposals';
import { setTransactionRecipe } from 'redux/slices/newProposal';
import { selectUserAddress } from 'redux/slices/user';

import FETCH_STATUSES from 'enums/fetchStatuses';
import DAO_TILE_VARIANTS from 'enums/daoTileVariants';

import useProposal from 'hooks/useProposal';

import newFundingSchema from 'validators/newFundingSchema';

import abiLibrary from 'lib/abi';

const StyledBox = styled(Box)`
  width: 100%;
`;

const initialValues = {
  title: '',
  description: '',
  link: '',
  tributeOffered: 0,
  paymentRequested: 0,
  applicant: '0x0',
};

const NewProposalForm: FC = () => {
  const dispatch = useDispatch();
  const sendProposalStatus = useSelector(selectProposalStatus);
  const userAddress = useSelector(selectUserAddress);

  // MOCKED -----------------------------
  const version = 2;
  const daoAddress = process.env.DAO_ADDRESS;
  const lootRequested = 0;
  const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;
  const paymentToken = process.env.TRIBUTE_TOKEN_ADDRESS;
  // MOCKED -----------------------------

  const onSubmit = async (values: any) => {
    try {
      dispatch(setProposalStatus(FETCH_STATUSES.LOADING));

      const modifiedLink = values.link.replace(/(^\w+:|^)\/\//, '');

      // TODO: check if applicant address is validated

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const receipt = await useProposal(
        userAddress,
        abiLibrary,
        version,
        daoAddress as any,
        userAddress,
        values.tributeOffered,
        lootRequested,
        values.tributeOffered,
        tributeToken,
        values.tributeOffered,
        paymentToken,
        /* Details JSON */ {
          title: values.title,
          description: values.description,
          link: modifiedLink,
        },
      );

      dispatch(setTransactionRecipe(receipt));
      console.log(receipt);
      dispatch(setProposalStatus(FETCH_STATUSES.SUCCESS));
    } catch (error) {
      dispatch(setTransactionRecipe(error));
      console.log(error);

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
          Create new proposal with funding
        </TypographyBold>
        <Formik validationSchema={newFundingSchema} initialValues={initialValues} validateOnChange onSubmit={onSubmit}>
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
                    tootltip="Please provide a brief detailed description"
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
                    inputProps={{
                      id: 'link',
                      value: formik.values.link,
                      onChange: formik.handleChange,
                      multiline: true,
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
                    tootltip="TODO: add tooltip text"
                    inputProps={{
                      id: 'tributeOffered',
                      value: formik.values.tributeOffered,
                      onChange: formik.handleChange,
                      multiline: true,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.tributeOffered}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Payment Requested"
                    tootltip="TODO: add tooltip text"
                    inputProps={{
                      id: 'paymentRequested',
                      value: formik.values.paymentRequested,
                      onChange: formik.handleChange,
                      multiline: true,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.paymentRequested}
                  />
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Aplicant:</Typography>
                  isAddress
                  <TypographyBold variant="subtitle2" mx={1}>
                    validated or no
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">Type of coin offered</Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Tribute Token:</Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    dCKB
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">Type of coin offered</Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Payment token: </Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    dCKB
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">Type of coin offered</Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography variant="subtitle2">Shares Requested: </Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    {new Intl.NumberFormat('en-US').format(formik.values.tributeOffered * 10 ** 8)}
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">Amount of shares</Typography>
                  </TooltipIcon>
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

                {sendProposalStatus === FETCH_STATUSES.SUCCESS && (
                  <Box mt={2}>
                    <DAOTile variant={DAO_TILE_VARIANTS.GREEN_BACKGROUND}>
                      <Typography p={2}>Congratulations! Your proposal has been submitted.</Typography>
                    </DAOTile>
                  </Box>
                )}

                {sendProposalStatus === FETCH_STATUSES.ERROR && (
                  <Box mt={2}>
                    <DAOTile variant={DAO_TILE_VARIANTS.RED_OUTLINE}>
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

export default NewProposalForm;
