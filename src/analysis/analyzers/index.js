'use strict';

/**
 * src/analysis/analyzers/index.js
 *
 * Registry mapping analysisType -> analyzer module. Adding a new
 * analyzer type is: add a sibling file exporting
 * { analysisType, promptVersion, instructions }, then add one line here.
 */

const comprehensiveV1 = require('./comprehensiveV1');

const registry = {
  [comprehensiveV1.analysisType]: comprehensiveV1,
};

function getAnalyzer(analysisType) {
  const analyzer = registry[analysisType];
  if (!analyzer) {
    throw new Error(`Unknown analysisType "${analysisType}". Known types: ${Object.keys(registry).join(', ')}`);
  }
  return analyzer;
}

module.exports = { getAnalyzer };
