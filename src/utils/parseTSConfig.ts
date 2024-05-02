import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  rootDir: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const currentWorkDir = process.cwd();

  const configFile = ts.findConfigFile(
    currentWorkDir,
    ts.sys.fileExists,
    tsconfigPath,
  );

  if (configFile) {
    const { config, error } = ts.readConfigFile(configFile, ts.sys.readFile);

    const parsedConfig = ts.parseJsonConfigFileContent(
      config,
      ts.sys,
      currentWorkDir,
    );

    return {
      parsedConfig,
      error,
    };
  } else {
    throw new Error(`Cannot find tsconfig file: ${tsconfigPath}`);
  }
};

export default parseTSConfig;
