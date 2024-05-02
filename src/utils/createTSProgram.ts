import ts from 'typescript';

import parseTSCompilerOptions from './parseTSCompilerOptions';

const createTSProgram = (
  testPath: string,
  rootDir?: string,
  tsconfigPath?: string,
) => {
  const compilerOptions = parseTSCompilerOptions(rootDir, tsconfigPath);

  return ts.createProgram([testPath], {
    noEmit: true,
    ...compilerOptions,
  });
};

export default createTSProgram;
