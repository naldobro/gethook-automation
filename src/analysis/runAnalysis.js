'use strict';

/**
 * src/analysis/runAnalysis.js
 *
 * CLI entrypoint for the Brand Analysis Engine — no UI yet (Milestone 3).
 * Usage:
 *   node src/analysis/runAnalysis.js <brandName> [analysisType]
 */

const { generateBrandAnalysis } = require('./analysisService');
const { error } = require('../browser/logger');

const [, , brandName, analysisType] = process.argv;

if (!brandName) {
  console.error('Usage: node src/analysis/runAnalysis.js <brandName> [analysisType]');
  process.exit(1);
}

generateBrandAnalysis(brandName, analysisType ? { analysisType } : undefined)
  .then((result) => {
    console.log('\n----- ANALYSIS COMPLETE -----');
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((err) => {
    error('ANALYSIS', err.stack || err.message);
    process.exit(1);
  });
