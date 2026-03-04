import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import convert from "heic-convert";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const assetsDir = path.join(repoRoot, "src", "assets");
const convertedDir = path.join(assetsDir, "converted");
const heifBrands = new Set([
  "heic",
  "heix",
  "hevc",
  "hevx",
  "mif1",
  "msf1",
]);

async function readHeader(filePath) {
  const file = await fs.open(filePath, "r");
  const header = Buffer.alloc(64);

  try {
    const { bytesRead } = await file.read(header, 0, header.length, 0);
    return header.subarray(0, bytesRead);
  } finally {
    await file.close();
  }
}

function bufferLooksLikeHeif(buffer) {
  if (buffer.length < 16) {
    return false;
  }

  const signature = buffer.toString("ascii", 4, 8);
  const majorBrand = buffer.toString("ascii", 8, 12);

  if (signature !== "ftyp") {
    return false;
  }

  if (heifBrands.has(majorBrand)) {
    return true;
  }

  for (let offset = 16; offset + 4 <= buffer.length; offset += 4) {
    const compatibleBrand = buffer.toString("ascii", offset, offset + 4);

    if (heifBrands.has(compatibleBrand)) {
      return true;
    }
  }

  return false;
}

async function isHeifCandidate(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  if (extension === ".heic" || extension === ".heif") {
    return true;
  }

  const header = await readHeader(filePath);
  return bufferLooksLikeHeif(header);
}

async function convertFile(sourcePath, targetPath) {
  const inputBuffer = await fs.readFile(sourcePath);
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: "JPEG",
    quality: 0.88,
  });

  await fs.writeFile(targetPath, outputBuffer);
}

async function main() {
  await fs.mkdir(convertedDir, { recursive: true });

  const entries = await fs.readdir(assetsDir, { withFileTypes: true });
  const candidates = [];

  for (const entry of entries) {
    if (!entry.isFile()) {
      continue;
    }

    const sourcePath = path.join(assetsDir, entry.name);

    if (await isHeifCandidate(sourcePath)) {
      candidates.push(sourcePath);
    }
  }

  if (candidates.length === 0) {
    console.log("No HEIF/HEIC files found in src/assets.");
    return;
  }

  let convertedCount = 0;
  let skippedCount = 0;

  for (const sourcePath of candidates) {
    const baseName = path.parse(sourcePath).name;
    const targetPath = path.join(convertedDir, `${baseName}.jpg`);

    try {
      const [sourceStat, targetStat] = await Promise.all([
        fs.stat(sourcePath),
        fs.stat(targetPath).catch(() => null),
      ]);

      if (targetStat && targetStat.mtimeMs >= sourceStat.mtimeMs) {
        console.log(`Skipped ${path.basename(sourcePath)} (already up to date)`);
        skippedCount += 1;
        continue;
      }

      await convertFile(sourcePath, targetPath);
      console.log(
        `Converted ${path.basename(sourcePath)} -> converted/${path.basename(targetPath)}`,
      );
      convertedCount += 1;
    } catch (error) {
      console.error(`Failed to convert ${path.basename(sourcePath)}: ${error.message}`);
      process.exitCode = 1;
    }
  }

  console.log(
    `Photo prep complete: ${convertedCount} converted, ${skippedCount} skipped.`,
  );
}

main().catch((error) => {
  console.error(`Photo prep failed: ${error.message}`);
  process.exit(1);
});
