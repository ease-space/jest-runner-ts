import path from 'path';
import tsconfig from 'get-tsconfig';
import ts from 'typescript';

const parseTSCompilerOptions = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const tsconfigResult = tsconfig.getTsconfig(tsconfigPath);

  if (tsconfigResult) {
    const { options } = ts.convertCompilerOptionsFromJson(
      tsconfigResult.config.compilerOptions,
      rootDir,
    );

    return options;
  }
};

export default parseTSCompilerOptions;
