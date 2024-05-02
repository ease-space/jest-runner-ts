import path from 'path';
import ts from 'typescript';

import parseTSConfig from './parseTSConfig';

const createTSProgram = (
  rootDir: string,
  testPath: string,
  tsconfigPath?: string,
) => {
  // const currentWorkDir = process.cwd();
  //
  // const configFile = ts.findConfigFile(
  //   currentWorkDir,
  //   ts.sys.fileExists,
  //   tsconfigPath,
  // );
  //
  // if (configFile) {
  //   const { config, error } = ts.readConfigFile(configFile, ts.sys.readFile);
  //
  //   const parsedConfig = ts.parseJsonConfigFileContent(
  //     config,
  //     ts.sys,
  //     currentWorkDir,
  //   );
  //
  //   const program = ts.createProgram([testPath], {
  //     noEmit: true,
  //     ...parsedConfig.options,
  //   });
  //
  //   return {
  //     program,
  //     error,
  //   };
  // } else {
  //   throw new Error(`Cannot find tsconfig file: ${tsconfigPath}`);
  // }

  const { config, error } = parseTSConfig(rootDir, tsconfigPath);

  const program = ts.createProgram([testPath], {
    noEmit: true,
    ...config.options,
  });

  return {
    program,
    error,
  };
};

export default createTSProgram;
