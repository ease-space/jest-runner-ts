import { RunTestOptions, fail } from 'create-jest-runner';

import createTSProgram from '../utils/createTSProgram';

type ExtraOptions = {
  tsconfigPath?: string;
};

module.exports = (options: RunTestOptions<ExtraOptions>) => {
  const { testPath, config, extraOptions } = options;

  const start = Date.now();

  const { program, error } = createTSProgram(
    config.rootDir,
    testPath,
    extraOptions.tsconfigPath,
  );

  const baseObj = {
    start,
    title: 'tsc',
    test: { path: testPath },
  };

  if (error) {
    return fail({
      ...baseObj,
      end: Date.now(),
      errorMessage: error,
    });
  }

  //console.log('OPTIONS', options);

  //console.log('EXTRA OPTIONS', extraOptions);
};
