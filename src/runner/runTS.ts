import { RunTestOptions } from 'create-jest-runner';

module.exports = (options: RunTestOptions) => {
  const { extraOptions } = options;

  console.log('OPTIONS', extraOptions);
};
