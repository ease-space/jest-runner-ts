import { createJestRunner } from 'create-jest-runner';

import getExtraOptions from '../utils/getExtraOptions';

const runner = createJestRunner(require.resolve('./runTS'), {
  getExtraOptions,
});

module.exports = runner;
