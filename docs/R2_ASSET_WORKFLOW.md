# R2 asset workflow

The R2 bucket for public Copa Marathon assets is `vibevs-storage`. These commands do not modify
frontend URLs, DNS, or existing assets unless `--overwrite` is explicitly supplied.

## Mutable asset

Use when the same URL may be replaced in the future.

```bash
npm run r2:upload -- ./assets/copa-stamp.webp optimized-copa-stamp.webp --cache mutable
```

Cache policy: `public, max-age=2592000`.

## Immutable asset

Use only when the filename is versioned and will never be replaced.

```bash
npm run r2:upload -- ./assets/copa-stamp.webp optimized-copa-stamp-v2.webp --cache immutable
```

Cache policy: `public, max-age=31536000, immutable`.

The uploader warns when an immutable filename does not appear versioned; it never renames keys.

## Dry run

Use `--dry-run` to perform account and overwrite checks without uploading:

```bash
npm run r2:upload -- ./assets/copa-stamp.webp optimized-copa-stamp-v2.webp --cache immutable --dry-run
```

## Recommended workflow

New asset: version filename → upload → verify.

Updated mutable asset: explicit `--overwrite` → verify.

```bash
npm run r2:verify -- optimized-copa-stamp.webp
```

The uploader aborts unless Wrangler reports the expected Cloudflare account, and it compares local
and public-object SHA-256 values after upload.

## Future custom domain

PURGE SUPPORT: DEFERRED UNTIL `assets.copamarathon.com` IS ACTIVE.

When a custom domain with Cloudflare edge caching is active, an overwritten URL should be purged
exactly, verified, and warmed. This tooling intentionally does not invoke any purge API.
