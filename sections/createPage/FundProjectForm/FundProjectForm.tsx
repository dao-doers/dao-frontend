/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';

import styled from '@emotion/styled';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import TooltipIcon from 'components/TooltipIcon';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import useHandleCreateProposal from 'hooks/useHandleCreateProposal';
import useIsMobile from 'hooks/useIsMobile';

import newFundingSchema from 'validators/newFundingSchema';

import { getMetamaskMessageError } from 'utils/blockchain';

import config from 'config/config';

import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { selectUserAddress, selectIsLoggedIn, selectUserShares, selectdckbBalance } from 'redux/slices/user';
import { selectProvider } from 'redux/slices/main';

const initialValues = {
  title: '',
  description: '',
  link: '',
  tributeOffered: 0,
  paymentRequested: 0,
  applicant: '0x0',
};

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.colors.col4};
  font-weight: 600;
`;

const FundProjectForm: FC = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userShares = useSelector(selectUserShares);
  const dckbBalance = useSelector(selectdckbBalance);

  const isMobile = useIsMobile('md');

  const onSubmit = async (values: any) => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const modifiedLink = values.link.replace(/(^\w+:|^)\/\//, '');
      const proposalCreator = userAddress;
      const applicantAddress = values.applicant;
      const sharesRequested = values.tributeOffered * config.general.tribute_sharesRatio;
      const lootRequested = 0;
      const { tributeOffered } = values;
      const { paymentRequested } = values;

      if (Number(dckbBalance) < values.tributeOffered) {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage('You have not enough dCKB'));
      } else {
        const receipt = await useHandleCreateProposal(
          provider,
          proposalCreator,
          applicantAddress,
          sharesRequested,
          lootRequested,
          tributeOffered,
          paymentRequested,
          { title: values.title, description: values.description, link: modifiedLink },
        );

        if (receipt.blockNumber) {
          dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
          dispatch(
            setMessage(
              `Your request has been processed by blockchain network and will be displayed with the block number ${
                receipt.blockNumber + 1
              }`,
            ),
          );
        }
        if (receipt.code) {
          dispatch(setStatus(PROCESSING_STATUSES.ERROR));
          dispatch(setMessage(getMetamaskMessageError(receipt)));
        }
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(PROCESSING_STATUSES.ERROR));
      dispatch(setMessage(getMetamaskMessageError(error)));
    }
  };

  return (
    <Box width="100%">
      <Box maxWidth="500px" mx="auto" pt={3}>
        {isMobile && (
          <Typography variant="body2" mb={3}>
            Press question mark to display tooltip.
          </Typography>
        )}
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
                    label="Applicant address"
                    tootltip="You must specify the address of the account to be added to the Guild."
                    inputProps={{
                      id: 'applicant',
                      value: formik.values.applicant,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.applicant}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Tribute Offered"
                    tootltip="The amount of dCKB you are committing to deposit to the DAO bank."
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
                    tootltip="The amount of payment requested. Payment can be requested in dCKB token held by the DAO."
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

                <Typography variant="subtitle1-bold" paragraph>
                  Summary:
                </Typography>

                <Box display="flex" width="100%" mb={2}>
                  <Typography>Tribute Offered:</Typography>
                  <Typography variant="body1-bold" mx={1}>
                    {new Intl.NumberFormat('en-US').format(
                      // eslint-disable-next-line no-restricted-globals
                      isNaN(formik.values.tributeOffered) ? 0 : formik.values.tributeOffered,
                    )}{' '}
                    dCKB
                  </Typography>
                  <TooltipIcon>
                    <Typography variant="body2">
                      The amount of dCKB you are committing to deposit to the DAO bank.
                    </Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography>Payment Requested: </Typography>
                  <Typography variant="body1-bold" mx={1}>
                    {new Intl.NumberFormat('en-US').format(
                      // eslint-disable-next-line no-restricted-globals
                      isNaN(formik.values.paymentRequested) ? 0 : formik.values.paymentRequested,
                    )}{' '}
                    dCKB
                  </Typography>
                  <TooltipIcon>
                    <Typography variant="body2">
                      The amount of payment requested. Payment can be requested in dCKB token held by the DAO.
                    </Typography>
                  </TooltipIcon>
                </Box>

                <Box display="flex" width="100%" mb={2}>
                  <Typography>Shares Requested: </Typography>
                  <Typography variant="body1-bold" mx={1}>
                    {new Intl.NumberFormat('en-US').format(
                      // eslint-disable-next-line no-restricted-globals
                      isNaN(formik.values.tributeOffered) ? 0 : formik.values.tributeOffered,
                    )}
                  </Typography>
                  <TooltipIcon>
                    <Typography variant="body2">
                      Voting shares in the DAO. Members can request payment be made in shares up to x% of the total
                      amount requested.
                    </Typography>
                  </TooltipIcon>
                </Box>

                <Box>
                  {!isLoggedIn && <ConnectWalletButton />}

                  {userShares > 0 && isLoggedIn && (
                    <DAOButton variant="gradientOutline" type="submit">
                      Send request
                    </DAOButton>
                  )}

                  {userShares === 0 && isLoggedIn && (
                    <TypographyRed ml={1} variant="subtitle2" align="center">
                      You&apos;re not a member of the Guild.
                    </TypographyRed>
                  )}
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default FundProjectForm;
