import process from 'node:process';

import { assertSafeKey, fetchAssetMetadata } from './r2-asset-utils.mjs';

async function main() {
  const [remoteKey] = process.argv.slice(2);
  if (!remoteKey) {
    console.error('Usage: npm run r2:verify -- <remote-key>');
    process.exit(1);
  }
  assertSafeKey(remoteKey);

  const metadata = await fetchAssetMetadata(remoteKey);
  console.log(`URL: ${metadata.url}`);
  console.log(`HTTP: ${metadata.status}`);
  console.log(`Content-Type: ${metadata.contentType ?? 'missing'}`);
  console.log(`Cache-Control: ${metadata.cacheControl ?? 'missing'}`);
  console.log(`ETag: ${metadata.etag ?? 'missing'}`);
  console.log(`Last-Modified: ${metadata.lastModified ?? 'missing'}`);
  if (metadata.status !== 200 || !metadata.contentType || !metadata.etag || !metadata.lastModified) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(`VERIFY FAILED: ${error.message}`);
  process.exit(1);
});
