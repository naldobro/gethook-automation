'use strict';

/**
 * src/analysis/analysisRepository.js
 *
 * Repository Layer for saving generated analyses to brand_analyses
 * (supabase/migrations/). Insert-only — every call adds a new row, never
 * overwrites a previous one, so analysis history is preserved as prompts
 * and models evolve over time.
 */

const { supabase } = require('../supabase/client');

async function saveBrandAnalysis({ brandId, analysisType, promptVersion, model, markdown }) {
  const { data, error } = await supabase
    .from('brand_analyses')
    .insert({
      brand_id: brandId,
      analysis_type: analysisType,
      prompt_version: promptVersion,
      model,
      markdown,
    })
    .select('id, created_at')
    .single();

  if (error) {
    throw new Error(`Failed to save analysis for brand_id=${brandId}: ${error.message}`);
  }

  return { id: data.id, createdAt: data.created_at };
}

module.exports = { saveBrandAnalysis };
