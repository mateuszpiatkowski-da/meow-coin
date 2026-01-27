import { localNetStaticConfig, WalletSDKImpl } from '@canton-network/wallet-sdk';
import { createLogger } from '../util/logger';

const logger = createLogger({ name: 'WalletSDK' });

const sdk = new WalletSDKImpl().configure({
  logger,
});

export default sdk;
