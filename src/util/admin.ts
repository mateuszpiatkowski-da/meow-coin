import Singleton from './singleton';
import type { KeyPair } from '@canton-network/core-signing-lib';

class Admin extends Singleton {
  public partyId: string = '';
  public keyPair: KeyPair = { publicKey: '', privateKey: '' };

  constructor() {
    super();
  }
}

const admin = Admin.getInstance();
export default admin;
