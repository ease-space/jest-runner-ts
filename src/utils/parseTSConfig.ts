import path from 'path';
import { readConfigFile, parseJsonConfigFileContent, sys } from 'typescript';

const parseTSConfig = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const { config, error } = readConfigFile(tsconfigPath, sys.readFile);

  const parsedConfig = parseJsonConfigFileContent(config, sys, rootDir);

  return {
    config: parsedConfig,
    error,
  };
};

export default parseTSConfig;
