import { RunTestOptions, fail } from 'create-jest-runner';

import createTSProgram from '../utils/createTSProgram';

type ExtraOptions = {
  tsconfigPath?: string;
};

module.exports = (options: RunTestOptions<ExtraOptions>) => {
  const { testPath, config, extraOptions } = options;

  const start = Date.now();

  const { program, error } = createTSProgram(
    testPath,
    config.rootDir,
    extraOptions.tsconfigPath,
  );

  const baseObj = {
    start,
    title: 'ts',
    test: {
      path: testPath,
    },
  };

  if (error) {
    return fail({
      ...baseObj,
      end: Date.now(),
      errorMessage: error.messageText.toString(),
    });
  }

  //console.log('OPTIONS', options);

  //console.log('EXTRA OPTIONS', extraOptions);
};
