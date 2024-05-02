import ts from 'typescript';

import parseTSConfig from './parseTSConfig';

const createTSProgram = (
  testPath: string,
  jestRootDir?: string,
  tsconfigPath?: string,
) => {
  const { config, error } = parseTSConfig(jestRootDir, tsconfigPath);

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
