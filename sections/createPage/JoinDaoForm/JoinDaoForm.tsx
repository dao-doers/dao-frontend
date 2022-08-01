/* eslint-disable react-hooks/rules-of-hooks */
import { FC } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import TooltipIcon from 'components/TooltipIcon';

import PROCESSING_STATUSES from 'enums/processingStatuses';

import invokeHandleCreateProposal from 'hooks/invokeHandleCreateProposal';
import useIsMobile from 'hooks/useIsMobile';

import newProposalSchema from 'validators/newProposalSchema';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectUserAddress, selectIsLoggedIn, selectDckbBalance } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import { ckbToShannons } from 'utils/units';

const initialValues = {
  title: '',
  description: '',
  link: '',
  tributeOffered: 0,
  sharesRequested: 0,
  lootRequested: 0,
};

const JoinDaoForm: FC = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const userAddress = useSelector(selectUserAddress);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dckbBalance = useSelector(selectDckbBalance);

  const isMobile = useIsMobile('md');

  const onSubmit = async (values: typeof initialValues) => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const modifiedLink = values.link.replace(/(^\w+:|^)\/\//, '');
      const proposalCreator = userAddress;
      const applicantAddress = userAddress;
      const { tributeOffered, sharesRequested, lootRequested } = values;
      const paymentRequested = 0;

      if (dckbBalance?.lt(values.tributeOffered)) {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage('You have not enough dCKB'));
      } else {
        const receipt = await invokeHandleCreateProposal(
          provider,
          proposalCreator,
          applicantAddress,
          sharesRequested,
          lootRequested,
          ckbToShannons(tributeOffered),
          paymentRequested,
          {
            title: values.title,
            description: values.description,
            link: modifiedLink,
          },
          chainId,
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
                    tootltip="The amount of dCKB you are committing to deposit to the DAO bank."
                    inputProps={{
                      id: 'tributeOffered',
                      placeholder: 'e.g. 10',
                      value: formik.values.tributeOffered,
                      onChange: formik.handleChange,
                      type: 'number',
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.tributeOffered}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Shares Requested"
                    tootltip="The amount of requested shares for your tribute. The current recommended convention is 1 dCKB : 1 voting share ratio."
                    inputProps={{
                      id: 'sharesRequested',
                      placeholder: 'e.g. 10',
                      value: formik.values.sharesRequested,
                      onChange: formik.handleChange,
                      type: 'number',
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.sharesRequested}
                  />
                </Box>

                <Box width="100%" mb={2}>
                  <DAOInput
                    label="Loot Requested"
                    tootltip="Non-voting shares. The current recommended convention is 1 dCKB : 1 loot ratio."
                    inputProps={{
                      id: 'lootRequested',
                      placeholder: 'e.g. 10',
                      value: formik.values.lootRequested,
                      onChange: formik.handleChange,
                      type: 'number',
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.lootRequested}
                  />
                </Box>

                <Typography variant="subtitle1-bold" paragraph>
                  Summary:
                </Typography>

                <Box display="flex" width="100%" mb={2}>
                  <Typography>Tribute :</Typography>
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

                <Box>
                  {!isLoggedIn && <ConnectWalletButton />}

                  {isLoggedIn && (
                    <DAOButton variant="gradientOutline" type="submit">
                      Send request
                    </DAOButton>
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

export default JoinDaoForm;
