import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  rootDir: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const currentWorkDir = process.cwd();

  const tsconfigFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);

  const config = ts.parseJsonConfigFileContent(
    tsconfigFile.config,
    ts.sys,
    currentWorkDir,
  );

  return {
    config,
    error: tsconfigFile.error,
  };
};

export default parseTSConfig;
