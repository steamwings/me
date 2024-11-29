const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const moment = require('moment-timezone');

const stagedFiles = execSync('git diff --cached --name-only').toString().split('\n');
const currentDate = moment().tz('America/New_York').format('YYYY-MM-DD');

function updateMetadata(file) {
  const dir = path.dirname(file);
  const metadataPath = path.join(dir, 'metadata.yml');

  if (!fs.existsSync(metadataPath)) {
    throw new Error(`No metadata.yml found in ${dir}`);
  }

  let metadata = fs.readFileSync(metadataPath, 'utf8');
  metadata = metadata.replace(/updated: .*/, `updated: ${currentDate}`);
  fs.writeFileSync(metadataPath, metadata, 'utf8');

  // Add the updated metadata.yml to the git staging area
  execSync(`git add "${metadataPath}"`);
}

stagedFiles
  .filter(file => file.endsWith('page.md'))
  .forEach(file => updateMetadata(file));
