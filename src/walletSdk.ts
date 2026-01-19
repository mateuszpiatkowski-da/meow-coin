import {
  WalletSDKImpl,
  localNetAuthDefault,
  localNetLedgerDefault,
  localNetTopologyDefault,
  localNetTokenStandardDefault,
  localValidatorDefault,
  localNetStaticConfig,
} from '@canton-network/wallet-sdk';

const sdk = new WalletSDKImpl().configure({
  authFactory: localNetAuthDefault,
  ledgerFactory: localNetLedgerDefault,
  topologyFactory: localNetTopologyDefault,
  tokenStandardFactory: localNetTokenStandardDefault,
  validatorFactory: localValidatorDefault,
});

await sdk.connect();
await sdk.connectAdmin();
await sdk.connectTopology(localNetStaticConfig.LOCALNET_SCAN_PROXY_API_URL);

export default sdk;
