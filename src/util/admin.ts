import type { KeyPair } from '@canton-network/core-signing-lib';

class Admin {
  public partyId: string = '';
  public keyPair: KeyPair = {
    publicKey: process.env.ADMIN_PUBLIC_KEY ?? '',
    privateKey: process.env.ADMIN_PRIVATE_KEY ?? '',
  };
}

const admin = new Admin();
export default admin;
