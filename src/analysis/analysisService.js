'use strict';

/**
 * src/analysis/analysisService.js
 *
 * Milestone 3: the Brand Analysis Engine's single public entrypoint,
 * generateBrandAnalysis(). Orchestrates: load brand -> load ads -> build
 * prompt -> call the LLM -> save markdown to disk -> save to Supabase.
 * Isolated from the scraper — imports only Supabase and the LLM
 * provider, never Playwright/browser modules (see README.md).
 */

const fs = require('fs');
const path = require('path');
const { log } = require('../browser/logger');
const { getBrandByName, getAdsForBrand } = require('./adRepository');
const { saveBrandAnalysis } = require('./analysisRepository');
const { buildAnalysisPrompt } = require('./instructionBuilder');
const { getAnalyzer } = require('./analyzers');
const { generateCompletion } = require('../llm/provider');

const PROJECT_ROOT = path.join(__dirname, '..', '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'output', 'analysis');
const DEFAULT_ANALYSIS_TYPE = 'comprehensive_v1';

function slugify(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Generates and persists one brand analysis. The markdown file on disk
 * (output/analysis/<brand>-analysis.md) is overwritten on every run —
 * Supabase's brand_analyses table is the historical record; disk is just
 * the latest snapshot.
 */
async function generateBrandAnalysis(brandName, { analysisType = DEFAULT_ANALYSIS_TYPE } = {}) {
  const analyzer = getAnalyzer(analysisType);

  const brand = await getBrandByName(brandName);
  log('ANALYSIS', `Brand loaded: "${brand.name}" (id=${brand.id}).`);

  const ads = await getAdsForBrand(brand.id);
  log('ANALYSIS', `Ads loaded: ${ads.length} ad(s) for brand "${brand.name}".`);

  if (ads.length === 0) {
    throw new Error(`No ads found for brand "${brand.name}" — nothing to analyze.`);
  }

  const meta = { brandName: brand.name, totalAds: ads.length };
  const prompt = buildAnalysisPrompt({ brand, ads, meta, analyzer });
  log('ANALYSIS', `Prompt built (${prompt.length} chars, analysisType="${analysisType}").`);

  log('ANALYSIS', 'LLM request started...');
  const { text: markdown, model } = await generateCompletion({ prompt });
  log('ANALYSIS', `LLM request completed (model="${model}", ${markdown.length} chars).`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const markdownPath = path.join(OUTPUT_DIR, `${slugify(brand.name)}-analysis.md`);
  fs.writeFileSync(markdownPath, markdown, 'utf-8');
  log('ANALYSIS', `Markdown saved: ${markdownPath}`);

  const saved = await saveBrandAnalysis({
    brandId: brand.id,
    analysisType,
    promptVersion: analyzer.promptVersion,
    model,
    markdown,
  });
  log('ANALYSIS', `Database saved: brand_analyses id=${saved.id}.`);

  return {
    brand,
    analysisType,
    promptVersion: analyzer.promptVersion,
    model,
    adsCount: ads.length,
    markdownPath,
    analysisId: saved.id,
  };
}

module.exports = { generateBrandAnalysis };
