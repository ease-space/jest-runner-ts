import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  jestRootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(jestRootDir, 'tsconfig.json'),
) => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

  const parsedConfig = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    jestRootDir,
  );

  return {
    config: parsedConfig,
    error,
  };
};

export default parseTSConfig;
