import { WalletSDKImpl, localNetStaticConfig } from '@canton-network/wallet-sdk';
import { createLogger } from './logger';

const logger = createLogger({ name: 'WalletSDK' });

const sdk = new WalletSDKImpl().configure({
  logger,
});

// Initialize SDK connections
await Promise.all([
  sdk.connect(),
  sdk.connectAdmin(),
  sdk.connectTopology(localNetStaticConfig.LOCALNET_SCAN_PROXY_API_URL), // TODO: establish the proper url,
]).then(() => {
  logger.info('SDK connected');
  return true;
});

export default sdk;
