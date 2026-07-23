'use strict';

/**
 * src/analysis/analyzers/comprehensiveV1.js
 *
 * "comprehensive_v1" analyzer: a single holistic pass across every ad
 * for a brand, treating the whole set as one dataset rather than
 * analyzing ads individually. Only the instructions text lives here —
 * the dataset serialization shared by every analyzer lives in
 * ../instructionBuilder.js. To add a new analyzer later, add a sibling
 * file exporting the same three fields and register it in ./index.js —
 * nothing else in the pipeline needs to change.
 */

const analysisType = 'comprehensive_v1';
const promptVersion = 'v1';

const instructions = `## Instructions

You are analyzing every collected ad for this brand as a single system, not as individual ads. Identify patterns across the entire set — do not summarize ads one by one.

Produce a comprehensive analysis in Markdown covering:

1. **Overview** — what this brand advertises and how, at a glance.
2. **Recurring hooks and angles** — opening lines, emotional appeals, or claims that repeat across multiple ads.
3. **Messaging themes** — the core value propositions and how they're framed.
4. **Structural patterns** — how ads are typically structured (problem/solution, testimonial, before/after, etc.), and how that varies by duration.
5. **Calls to action and landing pages** — patterns in what action ads drive toward and where they send traffic.
6. **Longevity signals** — what "active period" durations suggest about which angles are performing best.
7. **Notable outliers** — any ad that breaks from the dominant pattern, and why that might be.

Write the response as clean, well-structured Markdown with headers. Do not include a per-ad breakdown — every observation should be about the set as a whole.`;

module.exports = { analysisType, promptVersion, instructions };
