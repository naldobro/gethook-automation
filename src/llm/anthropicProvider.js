'use strict';

/**
 * src/llm/anthropicProvider.js
 *
 * Concrete Claude implementation behind src/llm/provider.js. Reads
 * ANTHROPIC_API_KEY from the environment (see .env.example) — never
 * hardcoded.
 *
 * Streams the request rather than using a single blocking call: analysis
 * prompts (every ad's transcript for a brand) can be long, and streaming
 * is the documented way to avoid SDK HTTP timeouts regardless of output
 * length. thinking is left adaptive (the model's own default) so it can
 * reason as needed across a full brand's ad set.
 */

require('dotenv').config();
const Anthropic = require('@anthropic-ai/sdk');

const MODEL = 'claude-opus-4-8';
const MAX_TOKENS = 16000;

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error(
    'Missing required environment variable: ANTHROPIC_API_KEY. Check your .env file against .env.example.'
  );
}

const client = new Anthropic();

/**
 * Sends `prompt` as a single user turn and returns the model's text
 * response plus which model actually produced it (so callers can record
 * that alongside the generated content without hardcoding the model
 * string themselves).
 */
async function generateCompletion({ prompt }) {
  const stream = client.messages.stream({
    model: MODEL,
    max_tokens: MAX_TOKENS,
    thinking: { type: 'adaptive' },
    messages: [{ role: 'user', content: prompt }],
  });

  const message = await stream.finalMessage();

  if (message.stop_reason === 'refusal') {
    throw new Error('Claude declined to generate this analysis (stop_reason="refusal").');
  }

  const textBlock = message.content.find((block) => block.type === 'text');
  if (!textBlock) {
    throw new Error(`Claude response had no text block (stop_reason="${message.stop_reason}").`);
  }

  return { text: textBlock.text, model: message.model };
}

module.exports = { generateCompletion };
