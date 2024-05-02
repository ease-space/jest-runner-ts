import path from 'path';
import tsconfig from 'get-tsconfig';
import ts from 'typescript';

const parseTSCompilerOptions = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const config = tsconfig.parseTsconfig(tsconfigPath);

  if (config) {
    const { options } = ts.convertCompilerOptionsFromJson(
      config.compilerOptions,
      rootDir,
    );

    return options;
  }

  return {};
};

export default parseTSCompilerOptions;
