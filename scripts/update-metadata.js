const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const moment = require('moment-timezone');

const stagedFiles = execSync('git diff --cached --name-only').toString().split('\n');
const currentDate = moment().tz('America/New_York').format('YYYY-MM-DD');

function updateMetadata(file) {
  if (!fs.existsSync(file)) {
    console.warn(`File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');

  // Simple regex replace to update the 'updated' field in YAML frontmatter
  content = content.replace(
    /^updated:\s*.*/m,
    `updated: ${currentDate}`
  );

  fs.writeFileSync(file, content, 'utf8');

  // Add the updated MDX file to the git staging area
  execSync(`git add "${file}"`);
  console.log(`Updated: ${file}`);
}

stagedFiles
  .filter(file => file.endsWith('content.mdx'))
  .forEach(file => updateMetadata(file));
