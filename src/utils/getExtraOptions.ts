import { cosmiconfigSync } from 'cosmiconfig';

const explorerSync = cosmiconfigSync('jest-runner-ts');

const getExtraOptions = () => {
  const searched = explorerSync.search();

  return searched?.config || {};
};

export default getExtraOptions;
