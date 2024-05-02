import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

  const parsedTSConfig = ts.parseJsonConfigFileContent(config, ts.sys, rootDir);

  return {
    config: parsedTSConfig,
    error,
  };
};

export default parseTSConfig;
