import { cosmiconfigSync } from 'cosmiconfig';

const explorerSync = cosmiconfigSync('jest-runner-ts');

const getExtraOptions = () => {
  const searchedFor = explorerSync.search();

  if (searchedFor) {
    return searchedFor.config;
  }

  return {};
};

module.exports = getExtraOptions;
