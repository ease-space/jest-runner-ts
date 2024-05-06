import { createProgram } from 'typescript';

import parseTSConfig from './parseTSConfig';

const createTSProgram = (
  testPath: string,
  rootDir?: string,
  tsconfigPath?: string,
  noEmit: boolean = true,
) => {
  const { config, error } = parseTSConfig(rootDir, tsconfigPath);

  const program = createProgram([testPath], {
    ...config.options,
    noEmit: config.options.noEmit ?? noEmit,
  });

  return {
    program,
    testPaths: config.fileNames,
    error,
  };
};

export default createTSProgram;
