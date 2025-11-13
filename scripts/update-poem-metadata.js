#!/usr/bin/env node

// Git hook script to update manifest file for poems directory
// This script updates the manifest with current git dates before each commit

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const MANIFEST_FILE = 'manifest.yml';
const POEM_REGEX = /poems\/[^\/]+\.txt$/;

function getLastCommitDate(file) {
  const result = execSync(`git log --follow --format="%ai" -n 1 -- "${file}"`, { encoding: 'utf8' });
  return formatDate(result.trim());
}

function getFirstCommitDate(file) {
  const result = execSync(`git log --follow --format="%ai" --diff-filter=A -- "${file}"`, { encoding: 'utf8' });
  const lines = result.trim().split('\n');
  return formatDate(lines[lines.length - 1]);
}

function formatDate(fullDate) {
  if (!fullDate) return null;
  return fullDate.split(' ')[0];
}

function isPoemFile(file) {
  return POEM_REGEX.test(file);
}

function loadExistingManifest() {
  try {
      if (fs.existsSync(MANIFEST_FILE)) {
          const content = fs.readFileSync(MANIFEST_FILE, 'utf8');
          return yaml.load(content) || { files: [] };
      }
  } catch (error) {
      console.warn(`Warning: Could not parse existing manifest: ${error.message}`);
  }
  return { files: [] };
}

function updateManifestEntry(updatedFiles, file) {
  const filename = path.basename(file);
  const existingIndex = updatedFiles.findIndex(entry => entry.name === filename);

  if (existingIndex >= 0) {
      // Update existing entry - preserve written date, update updated date
      updatedFiles[existingIndex].updated = getLastCommitDate(file) || updatedFiles[existingIndex].updated;
  } else {
      // New file - calculate both dates
      const writtenDate = getFirstCommitDate(file);
      const updatedDate = getLastCommitDate(file);

      if (writtenDate && updatedDate) {
          updatedFiles.push({
              name: filename,
              written: writtenDate,
              updated: updatedDate
          });
      }
  }
}

function updateManifest() {
  console.log('Updating manifest for poems directory...');

  // Get staged files
  const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf8' })
      .split('\n')
      .filter(f => f && isPoemFile(f));

  if (stagedFiles.length === 0) {
      console.log('No poem files staged for commit');
      return;
  }

  const manifest = loadExistingManifest();
  const updatedFiles = [];

  // Copy existing entries
  manifest.files.forEach(entry => {
      updatedFiles.push({ ...entry });
  });

  // Update entries with staged files
  stagedFiles.forEach(file => updateManifestEntry(updatedFiles, file));

  // Sort files by name for consistency
  updatedFiles.sort((a, b) => a.name.localeCompare(b.name));

  // Write updated manifest
  const newManifest = { files: updatedFiles };
  const yamlContent = yaml.dump(newManifest, {
      indent: 1,
      lineWidth: -1,
      quotingType: '"'
  });

  fs.writeFileSync(MANIFEST_FILE, yamlContent);
  console.log(`Manifest updated: ${MANIFEST_FILE}`);

  // Stage the updated manifest
  execSync(`git add "${MANIFEST_FILE}"`);
  console.log('Added updated manifest to commit');
}

try {
  updateManifest();
} catch (error) {
  console.error('Error updating manifest:', error.message);
  process.exit(1);
}
