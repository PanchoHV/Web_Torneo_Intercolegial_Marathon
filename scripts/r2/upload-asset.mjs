import { spawn } from 'node:child_process';
import process from 'node:process';

import {
  CACHE_POLICIES,
  R2_ACCOUNT_ID,
  R2_BUCKET,
  fetchAssetMetadata,
  isVersionedFilename,
  localSha256,
  mimeTypeFor,
  parseUploadArgs,
  usage,
} from './r2-asset-utils.mjs';

function runWrangler(args, { output = 'inherit' } = {}) {
  return new Promise((resolve) => {
    const child = spawn('npx', ['wrangler', ...args], {
      stdio: output === 'inherit' ? 'inherit' : ['ignore', 'pipe', 'pipe'],
    });
    let stdout = '';
    let stderr = '';
    if (output !== 'inherit') {
      if (output === 'capture') {
        child.stdout.on('data', (chunk) => { stdout += chunk; });
      } else {
        child.stdout.resume();
      }
      child.stderr.on('data', (chunk) => { stderr += chunk; });
    }
    child.on('close', (code) => resolve({ code: code ?? 1, stdout, stderr }));
    child.on('error', (error) => resolve({ code: 1, stdout, stderr: error.message }));
  });
}

async function requireExpectedAccount() {
  const result = await runWrangler(['whoami'], { output: 'capture' });
  if (result.code !== 0 || !(result.stdout + result.stderr).includes(R2_ACCOUNT_ID)) {
    console.error('WRONG CLOUDFLARE ACCOUNT');
    console.error(`Expected: ${R2_ACCOUNT_ID}`);
    process.exit(1);
  }
}

async function objectExists(remoteKey) {
  const result = await runWrangler(['r2', 'object', 'get', `${R2_BUCKET}/${remoteKey}`, '--remote', '--pipe'], {
    output: 'capture',
  });
  if (result.code === 0) return true;
  if (/not found|does not exist|nosuchkey/i.test(result.stderr)) return false;
  throw new Error(`Unable to determine whether object exists: ${result.stderr.trim()}`);
}

function printMetadata(metadata) {
  console.log(`URL: ${metadata.url}`);
  console.log(`HTTP: ${metadata.status}`);
  console.log(`Content-Type: ${metadata.contentType ?? 'missing'}`);
  console.log(`Cache-Control: ${metadata.cacheControl ?? 'missing'}`);
  console.log(`ETag: ${metadata.etag ?? 'missing'}`);
  console.log(`Last-Modified: ${metadata.lastModified ?? 'missing'}`);
}

async function main() {
  let options;
  try {
    options = parseUploadArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage('r2:upload'));
    process.exit(1);
  }

  const { localFile, remoteKey, cacheMode, overwrite, dryRun } = options;
  const mimeType = mimeTypeFor(localFile);
  const cacheControl = CACHE_POLICIES[cacheMode];
  const localHash = await localSha256(localFile).catch((error) => {
    console.error(`LOCAL FILE ERROR: ${error.message}`);
    process.exit(1);
  });

  await requireExpectedAccount();
  const exists = await objectExists(remoteKey);
  if (exists && !overwrite) {
    console.error('OBJECT ALREADY EXISTS');
    console.error('Use --overwrite only after confirming the target asset should be replaced.');
    process.exit(1);
  }
  if (exists) console.warn('WARNING: OVERWRITING EXISTING R2 OBJECT');
  if (cacheMode === 'immutable' && !isVersionedFilename(remoteKey)) {
    console.warn('IMMUTABLE ASSET SHOULD USE VERSIONED FILENAME');
  }
  if (dryRun) {
    console.log('DRY RUN: upload not executed.');
    console.log(`Bucket: ${R2_BUCKET}`);
    console.log(`Key: ${remoteKey}`);
    console.log(`Content-Type: ${mimeType}`);
    console.log(`Cache-Control: ${cacheControl}`);
    console.log(`LOCAL SHA256: ${localHash}`);
    return;
  }

  const upload = await runWrangler([
    'r2', 'object', 'put', `${R2_BUCKET}/${remoteKey}`, '--remote', '--file', localFile,
    '--content-type', mimeType, '--cache-control', cacheControl,
  ]);
  if (upload.code !== 0) process.exit(upload.code);

  const metadata = await fetchAssetMetadata(remoteKey, { includeHash: true });
  printMetadata(metadata);
  const valid = metadata.status === 200
    && metadata.contentType?.split(';')[0] === mimeType
    && metadata.cacheControl?.includes(cacheControl)
    && Boolean(metadata.etag)
    && Boolean(metadata.lastModified)
    && metadata.sha256 === localHash;
  console.log(`LOCAL SHA256: ${localHash}`);
  console.log(`REMOTE SHA256: ${metadata.sha256 ?? 'missing'}`);
  console.log(`SHA256 MATCH: ${metadata.sha256 === localHash ? 'PASS' : 'FAIL'}`);
  if (!valid) process.exit(1);
}

main().catch((error) => {
  console.error(`UPLOAD FAILED: ${error.message}`);
  process.exit(1);
});
