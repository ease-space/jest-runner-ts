import { RunTestOptions, fail, pass } from 'create-jest-runner';
import {
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
} from 'typescript';

import createTSProgram from '../utils/createTSProgram';
import createErrorCodeFrame from '../utils/createErrorCodeFrame';

type ExtraOptions = {
  tsconfigPath?: string;
};

const newLine = '\n';

const newParagraph = '\n\n';

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
      errorMessage: flattenDiagnosticMessageText(error.messageText, newLine),
    });
  }

  const emitResult = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics,
  );

  const errors = allDiagnostics
    .map((diagnostic) => {
      if (diagnostic.file) {
        return {
          errorMessage: flattenDiagnosticMessageText(
            diagnostic.messageText,
            newLine,
          ),
        };
      } else {
        return {
          errorMessage: flattenDiagnosticMessageText(
            diagnostic.messageText,
            newLine,
          ),
        };
      }
    })
    .map(() => {
      return createErrorCodeFrame();
    });

  const end = Date.now();

  if (errors.length === 0) {
    return pass({
      ...baseStatus,
      end,
    });
  }

  return fail({
    ...baseStatus,
    end,
    errorMessage: errors.join(newParagraph),
  });
};
