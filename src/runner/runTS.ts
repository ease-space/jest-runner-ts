import { RunTestOptions, fail } from 'create-jest-runner';
import ts from 'typescript';

import createTSProgram from '../utils/createTSProgram';

type ExtraOptions = {
  tsconfigPath?: string;
};

module.exports = (options: RunTestOptions<ExtraOptions>) => {
  const { testPath, config, extraOptions } = options;

  const start = Date.now();

  const { program, error } = createTSProgram(
    testPath,
    config.rootDir,
    extraOptions.tsconfigPath,
  );

  const baseStatus = {
    start,
    test: {
      title: 'ts',
      path: testPath,
    },
  };

  if (error) {
    return fail({
      ...baseStatus,
      end: Date.now(),
      errorMessage: error.messageText.toString(),
    });
  }

  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  console.log('allDiagnostics', emitResult.diagnostics.toString());
};
