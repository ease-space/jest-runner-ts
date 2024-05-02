import path from 'path';
import tsconfig from 'get-tsconfig';
import ts from 'typescript';

const parseTSCompilerOptions = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const tsconfigResult = tsconfig.parseTsconfig(tsconfigPath);

  if (tsconfigResult) {
    const { options } = ts.convertCompilerOptionsFromJson(
      tsconfigResult.compilerOptions,
      rootDir,
    );

    return options;
  }

  return {};
};

export default parseTSCompilerOptions;
