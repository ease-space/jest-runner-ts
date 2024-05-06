import { createProgram } from 'typescript';

import parseTSConfig from './parseTSConfig';

const createTSProgram = (
  testPath: string,
  rootDir?: string,
  tsconfigPath?: string,
) => {
  const { config, error } = parseTSConfig(rootDir, tsconfigPath);

  const program = createProgram([testPath], {
    noEmit: true,
    ...config.options,
  });

  return {
    program,
    config,
    error,
  };
};

export default createTSProgram;
