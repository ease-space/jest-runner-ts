import path from 'path';
import ts from 'typescript';

const createTSProgram = (
  rootDir: string,
  testPath: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const configFile = ts.findConfigFile(tsconfigPath, ts.sys.fileExists);

  const { config, error } = ts.readConfigFile(configFile, ts.sys.readFile);

  const parsedConfig = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    path.dirname(tsconfigPath),
  );

  const program = ts.createProgram([testPath], {
    noEmit: true,
    ...parsedConfig.options,
  });

  return {
    program,
    error,
  };
};

export default createTSProgram;
