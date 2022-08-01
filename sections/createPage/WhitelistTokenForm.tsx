import { FC } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ConnectWalletButton from 'components/ConnectWalletButton/ConnectWalletButton';
import DAOButton from 'components/DAOButton/DAOButton';
import DAOInput from 'components/DAOInput/DAOInput';
import PROCESSING_STATUSES from 'enums/processingStatuses';
import useIsMobile from 'hooks/useIsMobile';

import { getMetamaskMessageError } from 'utils/blockchain';

import { selectProvider, selectChainId } from 'redux/slices/main';
import { selectIsLoggedIn } from 'redux/slices/user';
import { setOpen, setStatus, setMessage } from 'redux/slices/modalTransaction';
import whitelistTokenFormSchema from 'validators/whitelistTokenFormSchema';
import { MolochV2 } from 'utils/contracts';
import { ethers } from 'ethers';

const initialValues = {
  title: '',
  description: '',
  link: '',
  tokenAddress: '',
};

const WhitelistTokenForm: FC = () => {
  const dispatch = useDispatch();

  const provider = useSelector(selectProvider);
  const chainId = useSelector(selectChainId);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const isMobile = useIsMobile('md');

  const onSubmit = async (values: typeof initialValues) => {
    try {
      dispatch(setStatus(PROCESSING_STATUSES.PROCESSING));
      dispatch(setOpen(true));

      const { tokenAddress, description, link, title } = values;

      const signer = provider.getSigner();
      const dao = await MolochV2(signer, chainId);

      const tx = await (dao as ethers.Contract).submitWhitelistProposal(
        tokenAddress,
        JSON.stringify({
          title,
          description,
          link,
        }),
      );

      const receipt = await tx.wait();

      if (receipt.blockNumber) {
        dispatch(setStatus(PROCESSING_STATUSES.SUCCESS));
        dispatch(setMessage('Your request has been processed by blockchain network.'));
      }
      if (receipt.code) {
        dispatch(setStatus(PROCESSING_STATUSES.ERROR));
        dispatch(setMessage(getMetamaskMessageError(receipt)));
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
        <Formik
          validationSchema={whitelistTokenFormSchema}
          initialValues={initialValues}
          validateOnChange
          onSubmit={onSubmit}
        >
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
                    label="Token address (ERC20)"
                    inputProps={{
                      id: 'tokenAddress',
                      value: formik.values.tokenAddress,
                      onChange: formik.handleChange,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    error={formik.errors.tokenAddress}
                  />
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

export default WhitelistTokenForm;
