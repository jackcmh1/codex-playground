import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const digest = data => createHash('sha256').update(data).digest('hex');

export function validateCatalog(catalog) {
  if (catalog.schema_version !== 1 || !Array.isArray(catalog.assets)) throw new Error('Unsupported catalog schema');
  const ids = new Set();
  const paths = new Set();
  for (const a of catalog.assets) {
    if (!a.id || ids.has(a.id)) throw new Error('Missing or duplicate asset ID');
    ids.add(a.id);
    if (!/^assets\/local\/catalog\/[A-Za-z0-9_-]+\.(png|webp)$/.test(a.local_path) || paths.has(a.local_path)) throw new Error('Unsafe or duplicate local path');
    paths.add(a.local_path);
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(a.source.repository)) throw new Error('Invalid source repository');
    if (!/^[0-9a-f]{40}$/.test(a.source.commit) || !/^[0-9a-f]{40}$/.test(a.source.blob_sha1) || !/^[0-9a-f]{64}$/.test(a.sha256)) throw new Error('Source must be pinned and checksummed');
    if (!/^(app\/assets\/umas\/[0-9]+\.webp|icons\/[0-9]+\.png)$/.test(a.source.path)) throw new Error('Unsupported source path');
    if (!Number.isSafeInteger(a.bytes) || a.bytes <= 0) throw new Error('Invalid byte count');
    if (a.rights.public_distribution_allowed && (a.rights.status !== 'verified' || !a.rights.permission_evidence)) throw new Error('Public distribution requires verified permission evidence');
  }
  for (const c of catalog.characters) if (!ids.has(c.image_asset)) throw new Error('Unknown character image');
  for (const s of catalog.skills) if (!ids.has(s.image_asset)) throw new Error('Unknown skill icon');
  return true;
}

export function verifyAsset(a, data) {
  const gitHash = createHash('sha1').update(`blob ${data.length}\0`).update(data).digest('hex');
  if (data.length !== a.bytes || digest(data) !== a.sha256 || gitHash !== a.source.blob_sha1) throw new Error(`Integrity mismatch: ${a.id}`);
  const validPng = data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const validWebp = data.toString('ascii',0,4) === 'RIFF' && data.toString('ascii',8,12) === 'WEBP';
  if (!(a.local_path.endsWith('.png') ? validPng : validWebp)) throw new Error(`Wrong image format: ${a.id}`);
}

async function run() {
  const command = process.argv[2] || 'check';
  if (!['check','fetch'].includes(command)) throw new Error('Usage: node scripts/asset-catalog.mjs [check|fetch]');
  const catalog = JSON.parse(await readFile(resolve(root,'assets/catalog.json'),'utf8'));
  validateCatalog(catalog);
  let present = 0;
  for (const a of catalog.assets) {
    const target = resolve(root, a.local_path);
    let data;
    try { data = await readFile(target); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    // Never overwrite a modified local file, even when fetching.
    if (data) { verifyAsset(a, data); present++; continue; }
    if (command === 'check') continue;
    const api = `repos/${a.source.repository}/contents/${a.source.path}?ref=${a.source.commit}`;
    const response = JSON.parse(execFileSync('gh',['api',api],{ encoding:'utf8',maxBuffer:10*1024*1024 }));
    if (response.encoding !== 'base64' || response.sha !== a.source.blob_sha1) throw new Error(`Unexpected upstream response: ${a.id}`);
    data = Buffer.from(response.content, 'base64');
    verifyAsset(a,data);
    await mkdir(dirname(target),{recursive:true});
    await writeFile(target,data,{flag:'wx'});
    present++;
  }
  console.log(`Catalog valid. Local verified images: ${present}/${catalog.assets.length}. Cleared for public distribution: ${catalog.assets.filter(a=>a.rights.public_distribution_allowed).length}.`);
  if (command === 'fetch' && present !== catalog.assets.length) throw new Error('Incomplete acquisition');
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  run().catch(error => { console.error(error.message); process.exitCode = 1; });
}
