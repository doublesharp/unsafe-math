const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const project = path.resolve(__dirname, '..');
const checkout = `${path.basename(project)}-${createHash('sha256').update(project).digest('hex').slice(0, 8)}`;
let outputDir = process.env.UNSAFE_MATH_BUILD_DIR;
if (!outputDir) {
  if (!fs.existsSync('/Volumes/Scratch')) {
    throw new Error(
      'Scratch is not mounted. Mount /Volumes/Scratch or set UNSAFE_MATH_BUILD_DIR on an ephemeral CI runner.'
    );
  }
  outputDir = path.join('/Volumes/Scratch', 'unsafe-math', 'build', checkout);
}
if (!path.isAbsolute(outputDir)) throw new Error('UNSAFE_MATH_BUILD_DIR must be an absolute path.');

module.exports = { outputDir };
