import { readFile, mkdir, copyFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const registry = await readFile(join(root, 'src/components/work/assets.js'), 'utf8');
const imports = [...registry.matchAll(/import\s+(\w+)\s+from\s+'\.\.\/\.\.\/assets\/projects\/([^']+)'/g)];
const referenced = registry.match(/export const PROJECT_ASSETS = \{([\s\S]*?)\};/)?.[1] || '';
const keys = new Set(referenced.match(/\b\w+\b/g) || []);
const output = {};
await mkdir(join(root, 'public/project-images'), { recursive: true });
for (const [, key, filename] of imports) {
  if (!keys.has(key)) continue;
  const extension = extname(filename).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp', '.avif'].includes(extension)) continue;
  const publicName = `${key}${extension}`;
  await copyFile(join(root, 'src/assets/projects', filename), join(root, 'public/project-images', publicName));
  output[key] = `/project-images/${publicName}`;
}
await writeFile(join(root, 'netlify/functions/project-assets.mjs'), `export default ${JSON.stringify(output, null, 2)};\n`);
