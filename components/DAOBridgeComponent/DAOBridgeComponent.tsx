// import React, { Suspense } from 'react';
// import { providers } from 'ethers';
// import { AddressTranslator } from 'nervos-godwoken-integration';
// import { BridgeComponent, Network } from 'nervos-bridge';
// import config from 'config/config';

// import DAOCircleLoader from 'components/DAOCircleLoader/DAOCircleLoader';

// const DAOBridgeComponent = () => {
//   const ethereum = window?.ethereum as providers.ExternalProvider;
//   const provider = new providers.Web3Provider(ethereum);

//   const addressTranslatorMainnet = new AddressTranslator({
//     CKB_URL: config.nervos.ckb.url,
//     RPC_URL: config.nervos.godwoken.rpcUrl,
//     INDEXER_URL: config.nervos.indexer.url,
//     deposit_lock_script_type_hash: config.nervos.depositLockScriptTypeHash,
//     eth_account_lock_script_type_hash: config.nervos.ethAccountLockCodeHash,
//     rollup_type_script: {
//       code_hash: config.nervos.rollupTypeScript.codeHash,
//       hash_type: config.nervos.rollupTypeScript.hashType,
//       args: config.nervos.rollupTypeScript.args,
//     },
//     rollup_type_hash: config.nervos.rollupTypeHash,
//     portal_wallet_lock_hash: config.nervos.portalWalletLockHash,
//   });

//   return (
//     <Suspense fallback={<DAOCircleLoader size={50} />}>
//       <BridgeComponent
//         network={Network.Testnet}
//         provider={provider}
//         addressTranslator={addressTranslatorMainnet}
//         config={{
//           godwokenRpcUrl: config.nervos.godwoken.rpcUrl,
//           ckbRpcUrl: config.nervos.ckb.url,
//           ckbIndexerUrl: config.nervos.indexer.url,
//           depositLockScriptTypeHash: config.nervos.depositLockScriptTypeHash,
//           ethAccountLockCodeHash: config.nervos.ethAccountLockCodeHash,
//           rollupTypeHash: config.nervos.rollupTypeHash,
//           bridge: {
//             forceBridge: {
//               url: config.nervos.forceBridgeUrl,
//             },
//           },
//         }}
//       />
//     </Suspense>
//   );
// };

// export default DAOBridgeComponent;
