import { localNetStaticConfig, WalletSDKImpl } from '@canton-network/wallet-sdk';
import { createLogger } from '../util/logger';

const logger = createLogger({ name: 'WalletSDK' });

class TestCoinWalletSDK {
  public impl = new WalletSDKImpl();

  constructor() {
    this.impl.configure({
      logger,
    });
  }

  public async init() {
    // Initialize SDK connections
    await Promise.all([
      this.impl.connect(),
      this.impl.connectAdmin(),
      this.impl.connectTopology(localNetStaticConfig.LOCALNET_SCAN_PROXY_API_URL),
    ]);
    logger.info('SDK connected');
  }
}

const testCoinWalletSDK = new TestCoinWalletSDK();
await testCoinWalletSDK.init();

const sdk = testCoinWalletSDK.impl;
export default sdk;
