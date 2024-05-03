import { RunTestOptions, fail } from 'create-jest-runner';
import {
  getPreEmitDiagnostics,
  flattenDiagnosticMessageText,
} from 'typescript';

import createTSProgram from '../utils/createTSProgram';

type ExtraOptions = {
  tsconfigPath?: string;
};

const newLine = '\n';

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
      errorMessage: `${flattenDiagnosticMessageText(
        error.messageText,
        newLine,
      )}`,
    });
  }

  const emitResult = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics,
  );

  const errors = allDiagnostics.map((diagnostic) => {
    if (diagnostic.file) {
    } else {
      return {
        errorMessage: `${flattenDiagnosticMessageText(
          diagnostic.messageText,
          newLine,
        )}`,
      };
    }
  });
};
