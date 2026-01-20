import { $, file } from 'bun';
import { join } from 'path';
import { readdirSync } from 'fs';
import sdk from './walletSdk';
import logger from './logger';

const uploadDar = async () => {
  const distDir = join(import.meta.dirname, '../../daml/.daml/dist');
  const darFiles = readdirSync(distDir)
    .filter((f) => /^test-coin-.*\.dar$/.test(f))
    .sort();

  if (darFiles.length === 0) {
    logger.info('Building .dar files...');
    await $`bun daml:rebuild`.quiet();
    return await uploadDar();
  }

  const darPath = join(distDir, darFiles[darFiles.length - 1]!);
  const darBytes = await file(darPath);
  try {
    await sdk.adminLedger?.uploadDar(new Uint8Array(await darBytes.arrayBuffer()));
  } catch (error: unknown) {
    const err = error as { code?: string };
    // Ignore KNOWN_PACKAGE_VERSION errors - the package already exists on the ledger
    if (err?.code !== 'KNOWN_PACKAGE_VERSION') {
      throw error;
    }
  }
};

export default uploadDar;
