import fs from 'fs';

function getWebPSize(buffer) {
  // WebP header is RIFF (4 bytes) + Size (4 bytes) + WEBP (4 bytes) + VP8/VP8L/VP8X (4 bytes)
  // For VP8X (Extended file format), width and height are at specific offsets
  const type = buffer.toString('ascii', 12, 16);
  if (type === 'VP8X') {
    const width = buffer.readUInt32LE(24) & 0x00FFFFFF;
    const height = buffer.readUInt32LE(27) & 0x00FFFFFF;
    return { width: width + 1, height: height + 1 };
  }
  // This is a simplified version, it might not catch all WebP types
  return null;
}

const files = ['1.webp', '2.webp', '3.webp'];
const results = {};

for (const file of files) {
  try {
    const fd = fs.openSync('d:/Cursor/MBTI_/mbti-vite/public/' + file, 'r');
    const buffer = Buffer.alloc(40);
    fs.readSync(fd, buffer, 0, 40, 0);
    fs.closeSync(fd);
    results[file] = getWebPSize(buffer);
  } catch (e) {
    results[file] = { error: e.message };
  }
}

console.log(JSON.stringify(results, null, 2));
