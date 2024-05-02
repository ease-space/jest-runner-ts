import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  rootDir: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const currentWorkDir = process.cwd();

  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

  const parsedConfig = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    currentWorkDir,
  );

  return {
    parsedConfig,
    error,
  };
};

export default parseTSConfig;
