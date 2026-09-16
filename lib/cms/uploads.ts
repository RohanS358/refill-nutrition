import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";

/**
 * Admin image uploads. Files land in public/uploads and are referenced by
 * their public path, so they behave exactly like the committed pack shots.
 *
 * TODO(infra): local disk — fine for the cPanel/Passenger target this
 * deploys to, ephemeral on serverless. Swap for object storage there.
 */

export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2 MB

/** Magic-number → extension. The browser's MIME type is not trusted. */
const SIGNATURES: { ext: string; test: (b: Buffer) => boolean }[] = [
  { ext: "png", test: (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  { ext: "jpg", test: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: "webp",
    test: (b) => b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP",
  },
  // SVG is deliberately absent: it is an XSS vector when served from our own
  // origin (a crafted <svg> can carry script). Pack shots are raster anyway.
];

const DIR = path.join(process.cwd(), "public", "uploads");

export type UploadResult = { ok: true; url: string } | { ok: false; error: string };

/**
 * Validate and store one uploaded image. Returns the public URL to put in a
 * product's `image` field.
 */
export async function saveUpload(file: File): Promise<UploadResult> {
  if (!file || file.size === 0) return { ok: false, error: "No file selected." };
  if (file.size > MAX_UPLOAD_BYTES) {
    return {
      ok: false,
      error: `Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 2 MB.`,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const match = SIGNATURES.find((s) => s.test(buffer));
  if (!match) {
    return { ok: false, error: "Unsupported file. Use PNG, JPG or WebP." };
  }

  // Never trust the client filename for the path — generate our own.
  const name = `${randomUUID()}.${match.ext}`;
  await fs.mkdir(DIR, { recursive: true });
  await fs.writeFile(path.join(DIR, name), buffer);
  return { ok: true, url: `/uploads/${name}` };
}

/** Remove a previously uploaded file. Ignores anything outside public/uploads. */
export async function deleteUpload(url: string): Promise<void> {
  if (!url.startsWith("/uploads/")) return;
  const name = path.basename(url);
  // basename() strips any traversal; re-join and verify we stayed inside DIR.
  const target = path.join(DIR, name);
  if (path.dirname(target) !== DIR) return;
  await fs.rm(target, { force: true });
}
