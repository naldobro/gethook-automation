'use strict';

/**
 * src/config.js
 *
 * Single home for collection-tunable values, so changing them later
 * doesn't mean editing scraper logic. Modules that need one of these
 * import this file directly rather than having the value threaded down
 * through function parameters from launch.js.
 */

module.exports = {
  maxAds: 50,

  filters: {
    // Empty = no constraint on that dimension (see src/scraper/filters.js).
    country: '',
    language: 'en',
    format: 'video',
  },

  collection: {
    continueOnError: true,
    deduplicateByMediaId: true,
  },
};
