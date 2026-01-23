import logger from './logger';
import { $, file } from 'bun';
import { join } from 'path';
import { readdirSync } from 'fs';
import sdk from './walletSDK';

type DARType = {
  path: string;
  files: string[];
};

export default class Initializer {
  private packageId: string = '';
  private dar: DARType | null = null;

  public async init() {
    sdk.tokenStandard?.setTransferFactoryRegistryUrl(
      new URL(`${import.meta.env.REGISTRY_URL}:${import.meta.env.PORT}`),
    );

    const distDir = join(import.meta.dirname, '../../daml/.daml/dist');
    let darFiles = readdirSync(distDir)
      .filter((f) => /^test-coin-.*\.dar$/.test(f))
      .sort();
    const darPath = join(distDir, darFiles[darFiles.length - 1]!);
    if (darFiles.length === 0) {
      logger.info('Building .dar files...');
      await $`bun daml:rebuild`.quiet();
      darFiles = readdirSync(distDir)
        .filter((f) => /^test-coin-.*\.dar$/.test(f))
        .sort();
    }

    this.dar = {
      path: darPath,
      files: darFiles,
    };

    const { main_package_id } = await $`daml damlc inspect-dar ${darPath} --json`.json();
    this.packageId = main_package_id;
    logger.info('Successfully obtained .dar package ID');
  }

  public async uploadDar() {
    if (!this.dar) return;
    if (await sdk.adminLedger?.isPackageUploaded(this.packageId)) {
      logger.info('DAR already uploaded, skipping...');
      return;
    }
    try {
      const darBytes = await file(this.dar.path);
      await sdk.adminLedger?.uploadDar(new Uint8Array(await darBytes.arrayBuffer()));
      logger.info(`DAR uploaded: ${this.dar.files[this.dar.files.length - 1]}`);
    } catch (error: unknown) {
      logger.error({ error }, 'DAR upload failed');
      throw error;
    }
  }

  // public async vetPackage() {
  //   // use ledgerClient <-
  //   console.log('VETTING');
  //   const synchronizers = await sdk.adminLedger?.listSynchronizers();
  //   console.log('DONE');
  //   const synchronizerId = synchronizers?.connectedSynchronizers?.[0]?.synchronizerId;

  //   console.log(synchronizers, synchronizerId);

  //   const adminApiUrl = '';
  //   const command = {
  //     id: synchronizerId,
  //     packageIds: [this.packageId],
  //     participantId: await sdk.adminLedger?.getParticipantId(),
  //   };

  //   const response = await fetch(`http://${adminApiUrl}/api/topology-manager/authorize`);
  // }
}
