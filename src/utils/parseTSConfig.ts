import { resolve } from 'path';
import { sys, readConfigFile, parseJsonConfigFileContent } from 'typescript';

const parseTSConfig = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = resolve(rootDir, 'tsconfig.json'),
) => {
  const { config, error } = readConfigFile(tsconfigPath, sys.readFile);

  const parsedConfig = parseJsonConfigFileContent(config, sys, rootDir);

  return {
    config: parsedConfig,
    error,
  };
};

export default parseTSConfig;
