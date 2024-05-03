import cosmiconfig from 'cosmiconfig';

const explorerSync = cosmiconfig.cosmiconfigSync('jest-runner-ts');

const getExtraOptions = () => {
  const searched = explorerSync.search();

  return searched?.config || {};
};

export default getExtraOptions;
