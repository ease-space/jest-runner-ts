import memoize from 'lodash.memoize';
import ts from 'typescript';

import parseTSConfig from './parseTSConfig';

const parseTSConfigMemoized = memoize(parseTSConfig);

const createTSProgram = (
  testPath: string,
  rootDir?: string,
  tsconfigPath?: string,
) => {
  const { config, error } = parseTSConfigMemoized(rootDir, tsconfigPath);

  const program = ts.createProgram([testPath], {
    noEmit: true,
    ...config.options,
  });

  return {
    program,
    error,
  };
};

export default createTSProgram;
