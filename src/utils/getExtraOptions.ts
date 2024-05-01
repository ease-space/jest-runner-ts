import { cosmiconfigSync } from 'cosmiconfig';

const explorerSync = cosmiconfigSync('jest-runner-ts');

const getExtraOptions = () => {
  const searchedFor = explorerSync.search();

  return searchedFor?.config ?? {};
};

export default getExtraOptions;
