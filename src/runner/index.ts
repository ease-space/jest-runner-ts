import { createJestRunner } from 'create-jest-runner';

import getExtraOptions from '../utils/getExtraOptions';

module.exports = createJestRunner(require.resolve('./runTS'), {
  getExtraOptions,
});
