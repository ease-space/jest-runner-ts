import path from 'path';
import tsconfig from 'get-tsconfig';
import ts from 'typescript';

const createTSProgram = (
  rootDir: string = process.cwd(),
  testPath: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const config = tsconfig.parseTsconfig(tsconfigPath);

  console.log('config', config);

  return ts.createProgram([testPath], {
    noEmit: true,
    ...config.compilerOptions,
  });
};

export default createTSProgram;
