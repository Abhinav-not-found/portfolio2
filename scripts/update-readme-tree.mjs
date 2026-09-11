import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const readmePath = path.join(rootDir, 'README.md');

const START_MARKER = '<!-- TREE:START -->';
const END_MARKER = '<!-- TREE:END -->';

const IGNORE = new Set([
  '.git',
  'node_modules',
  '.next',
  'dist',
  'build',
  '.turbo',
  'coverage',
]);

const DEPTH_LIMITS = {
  apps: 1,
  packages: 1,
};

function buildTree(dir, prefix = '', depth = Infinity) {
  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => !IGNORE.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });

  return entries.flatMap((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const nextPrefix = prefix + (isLast ? '    ' : '│   ');

    const line = `${prefix}${connector}${entry.name}`;

    if (entry.isDirectory() && depth > 0) {
      return [
        line,
        ...buildTree(
          path.join(dir, entry.name),
          nextPrefix,
          depth - 1,
        ),
      ];
    }

    return [line];
  });
}

function buildRootTree() {
  const entries = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter((entry) => !IGNORE.has(entry.name))
    .sort((a, b) => {
      if (a.isDirectory() !== b.isDirectory()) {
        return a.isDirectory() ? -1 : 1;
      }

      return a.name.localeCompare(b.name);
    });

  return entries.flatMap((entry, index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? '└── ' : '├── ';
    const prefix = isLast ? '    ' : '│   ';

    const line = `${connector}${entry.name}`;

    if (!entry.isDirectory()) {
      return [line];
    }

    const depth = DEPTH_LIMITS[entry.name] ?? Infinity;

    return [
      line,
      ...buildTree(
        path.join(rootDir, entry.name),
        prefix,
        depth,
      ),
    ];
  });
}

function updateReadme() {
  const readme = fs.readFileSync(readmePath, 'utf8');

  const startIndex = readme.indexOf(START_MARKER);
  const endIndex = readme.indexOf(END_MARKER);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error(
      `README.md must contain ${START_MARKER} and ${END_MARKER}`,
    );
  }

  if (startIndex >= endIndex) {
    throw new Error('Invalid README tree markers.');
  }

  const tree = [
    '```text',
    'portfolio2/',
    ...buildRootTree(),
    '```',
  ].join('\n');

  const before = readme.slice(0, startIndex + START_MARKER.length);
  const after = readme.slice(endIndex);

  const updatedReadme = `${before}\n${tree}\n${after}`;

  fs.writeFileSync(readmePath, updatedReadme);

  console.log('README.md project structure updated.');
}

updateReadme();