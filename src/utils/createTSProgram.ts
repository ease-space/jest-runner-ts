import path from 'path';
import ts from 'typescript';

const createTSProgram = (
  rootDir: string,
  testPath: string,
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

    const program = ts.createProgram([testPath], {
      noEmit: true,
      ...parsedConfig.options,
    });

    return {
      program,
      error,
    };
  } else {
    throw new Error(`${tsconfigPath} not found`);
  }
};

export default createTSProgram;
