/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import TooltipIcon from 'components/TooltipIcon';

import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { selectUserAddress } from 'redux/slices/user';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import useCreateProposal from 'hooks/useCreateProposal';

import newFundingSchema from 'validators/newFundingSchema';

import abiLibrary from 'lib/abi';
import { Chip } from '@mui/material';
import isAddress from 'validators/isAddress';

const initialValues = {
  title: '',
  description: '',
  link: '',
  tributeOffered: 0,
  paymentRequested: 0,
  applicant: '0x0',
};

const version = 2;
const daoAddress = process.env.DAO_ADDRESS;
const lootRequested = 0;
const tributeToken = process.env.TRIBUTE_TOKEN_ADDRESS;
const paymentToken = process.env.TRIBUTE_TOKEN_ADDRESS;

const TypographyBold = styled(Typography)`
  font-weight: 600;
`;

const CreateFundingForm: FC = () => {
  const dispatch = useDispatch();
  const userAddress = useSelector(selectUserAddress);

  const [applicant, setApplicant] = useState(initialValues.applicant);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setApplicant(userAddress);
  }, [userAddress]);

  useEffect(() => {
    const isApplicantValid = async () => {
      setValidated(await isAddress(userAddress));
    };
    isApplicantValid();
  }, [userAddress]);

  const onSubmit = async (values: any) => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const modifiedLink = values.link.replace(/(^\w+:|^)\/\//, '');

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
        values.tributeOffered,
        paymentToken,
        /* Details JSON */ {
          title: values.title,
          description: values.description,
          link: modifiedLink,
        },
      );

      dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
      dispatch(
        setMessage(`Your transaction has been processed by blockchain network and will be displayed with the block number 
      ${receipt.blockNumber + 1}`),
      );
    } catch (error) {
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
    }
  };

  return (
    <Box width="100%">
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
                      value: formik.values.tributeOffered,
                      placeholder: 'e.g. 10',
                      onChange: formik.handleChange,
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
                    tootltip="The number amount of payment requested. Payment can be requested in CKB token held by the DAO"
                    inputProps={{
                      id: 'paymentRequested',
                      value: formik.values.paymentRequested,
                      placeholder: 'e.g. 10',
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.paymentRequested}
                  />
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  Applicant:{' '}
                  {applicant ? (
                    <Chip
                      label={validated ? applicant : `${applicant} - address not valid`}
                      variant="outlined"
                      color={validated ? 'success' : 'info'}
                    />
                  ) : (
                    <Chip
                      label="You must specify an account that will receive the funding."
                      variant="outlined"
                      color="warning"
                    />
                  )}
                </Typography>

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
                  <Typography variant="subtitle2">Payment token: </Typography>
                  <TypographyBold variant="subtitle2" mx={1}>
                    dCKB
                  </TypographyBold>
                  <TooltipIcon>
                    <Typography variant="body2">CKB token to use for your payment</Typography>
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
                      Voting shares in the DAO. Members can request payment be made in shares up to x% of the total
                      amount requested.
                    </Typography>
                  </TooltipIcon>
                </Box>

                <Box>
                  <DAOButton variant="gradientOutline" type="submit">
                    Submit proposal
                  </DAOButton>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default CreateFundingForm;
