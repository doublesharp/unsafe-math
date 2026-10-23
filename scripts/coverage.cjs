const fs = require('node:fs');
const path = require('node:path');
const { outputDir } = require('./paths.cjs');
const { runForge } = require('./forge.cjs');
const { verifyCoverage } = require('./check-coverage.cjs');

(async () => {
  const folder = path.join(outputDir, 'coverage');
  fs.mkdirSync(folder, { recursive: true });
  const lcov = path.join(folder, 'lcov.info');
  const summaryPath = path.join(folder, 'summary.txt');
  for (const report of [lcov, summaryPath]) fs.rmSync(report, { force: true });
  const summary = await runForge(
    [
      'coverage',
      '--exclude-tests',
      '--no-match-contract',
      'GasSavingsTest',
      '--no-match-coverage',
      '^(test/|contracts/test/)',
      '--report',
      'summary',
      '--report',
      'lcov',
      '--report-file',
      lcov,
    ],
    { capture: true }
  );
  fs.writeFileSync(summaryPath, summary);
  process.stdout.write(summary);
  verifyCoverage(summary, fs.readFileSync(lcov, 'utf8'));
  console.log('Full production coverage gate passed.');
})().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
