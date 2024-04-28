import { createJestRunner } from 'create-jest-runner';
import cosmiconfig from 'cosmiconfig';

const explorer = cosmiconfig('jest-runner-ts');

const getExtraOptions = () => {
  const searchedFor = explorer.searchSync();

    if (searchedFor) {
      return searchedFor.config;
    }

    return {};
};

module.exports = createJestRunner(require.resolve('./runTS'), {
  getExtraOptions,
});
