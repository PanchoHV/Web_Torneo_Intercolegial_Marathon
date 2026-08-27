import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { basename, extname } from 'node:path';
import { Readable } from 'node:stream';

export const R2_BUCKET = 'vibevs-storage';
export const R2_ACCOUNT_ID = '92ad9a7ffd63c4cd20c65a4cc0482cca';
export const R2_PUBLIC_ORIGIN = 'https://pub-dc06325214ac4e9a8959030cf5f65654.r2.dev';

export const CACHE_POLICIES = {
  mutable: 'public, max-age=2592000',
  immutable: 'public, max-age=31536000, immutable',
};

const MIME_TYPES = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
};

export function usage(command) {
  return `Usage: npm run ${command} -- <local-file> <remote-key> [--cache mutable|immutable] [--overwrite] [--dry-run]`;
}

export function parseUploadArgs(args) {
  const positional = [];
  let cacheMode = 'mutable';
  let overwrite = false;
  let dryRun = false;

  for (let index = 0; index < args.length; index += 1) {
    const value = args[index];
    if (value === '--cache') {
      cacheMode = args[index + 1] ?? '';
      index += 1;
    } else if (value === '--overwrite') {
      overwrite = true;
    } else if (value === '--dry-run') {
      dryRun = true;
    } else if (value.startsWith('--')) {
      throw new Error(`Unknown option: ${value}`);
    } else {
      positional.push(value);
    }
  }

  if (positional.length !== 2) {
    throw new Error('A local file and remote key are required.');
  }
  if (!Object.hasOwn(CACHE_POLICIES, cacheMode)) {
    throw new Error('Cache mode must be "mutable" or "immutable".');
  }

  const [localFile, remoteKey] = positional;
  assertSafeKey(remoteKey);
  return { localFile, remoteKey, cacheMode, overwrite, dryRun };
}

export function assertSafeKey(key) {
  if (!key || key.startsWith('/') || key.split('/').includes('..')) {
    throw new Error('Remote key must be a relative R2 object key without ".." segments.');
  }
}

export function mimeTypeFor(filePath) {
  return MIME_TYPES[extname(filePath).toLowerCase()] ?? 'application/octet-stream';
}

export function assetUrl(remoteKey) {
  return `${R2_PUBLIC_ORIGIN}/${remoteKey.split('/').map(encodeURIComponent).join('/')}`;
}

export async function localSha256(filePath) {
  await stat(filePath);
  return sha256Stream(createReadStream(filePath));
}

export async function sha256Stream(stream) {
  const hash = createHash('sha256');
  for await (const chunk of stream) hash.update(chunk);
  return hash.digest('hex');
}

export async function fetchAssetMetadata(remoteKey, { includeHash = false } = {}) {
  const url = assetUrl(remoteKey);
  const response = await fetch(url);
  const metadata = {
    url,
    status: response.status,
    contentType: response.headers.get('content-type'),
    cacheControl: response.headers.get('cache-control'),
    etag: response.headers.get('etag'),
    lastModified: response.headers.get('last-modified'),
    sha256: null,
  };

  if (includeHash && response.ok && response.body) {
    metadata.sha256 = await sha256Stream(Readable.fromWeb(response.body));
  }

  return metadata;
}

export function isVersionedFilename(remoteKey) {
  return /(?:[-_.](?:v|rev)?\d+|[-_.][a-f0-9]{8,})(?=\.[^.]+$)/i.test(basename(remoteKey));
}

// Deliberately inactive until assets.copamarathon.com has Cloudflare edge caching.
export function purgeAssetUrl(url) {
  return { status: 'deferred', url, reason: 'PURGE SUPPORT: DEFERRED UNTIL assets.copamarathon.com IS ACTIVE' };
}
