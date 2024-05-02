import ts from 'typescript';

import parseTSConfig from './parseTSConfig';

const createTSProgram = (
  rootDir: string = process.cwd(),
  testPath: string,
  tsconfigPath?: string,
) => {
  const { config, error } = parseTSConfig(rootDir, tsconfigPath);

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
