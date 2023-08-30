#!/usr/bin/env node
import fs from 'node:fs';

fs.writeFileSync(
  'dist/esm/package.json',
  JSON.stringify({
    type: 'module',
  })
);
