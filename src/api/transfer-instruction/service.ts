import Singleton from 'src/util/singleton';
import sdk from 'src/util/walletSDK';
import type { WrappedCommand } from '@canton-network/wallet-sdk';
import { v4 } from 'uuid';
import admin from 'src/util/admin';
import { CoinTransferFactory } from '@daml-ts/test-coin-1.0.0/lib/Coin/Transfer/module';

export default class TransferService extends Singleton {
  constructor() {
    super();
  }

  async createTransferFactory() {
    const proposal: WrappedCommand<'CreateCommand'> = {
      CreateCommand: {
        templateId: CoinTransferFactory.templateId,
        createArguments: {
          admin: admin.partyId,
        },
      },
    };

    return await sdk.userLedger!.prepareSignExecuteAndWaitFor(proposal, admin.keyPair.privateKey, v4());
  }
}
