'use strict';

/**
 * src/llm/provider.js
 *
 * The only module the rest of the application should import for LLM
 * calls. Delegates to the concrete Claude implementation
 * (anthropicProvider.js) — callers never see model IDs, SDK types, or
 * request/response shapes. Swapping models or providers later means
 * changing anthropicProvider.js (or what this file delegates to), not
 * any caller.
 */

const { generateCompletion } = require('./anthropicProvider');

module.exports = { generateCompletion };
