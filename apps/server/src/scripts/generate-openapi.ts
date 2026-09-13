import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import swaggerSpec from '../shared/config/swagger.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, '../../../../packages/api');

const outputPath = path.join(outputDir, 'openapi.json');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, {
    recursive: true,
  });
}
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');

console.log(`OpenAPI specification generated at ${outputPath}`);
