import { RunTestOptions, fail, skip, pass } from 'create-jest-runner';
import {
  flattenDiagnosticMessageText,
  getPreEmitDiagnostics,
} from 'typescript';

import createTSProgram from '../utils/createTSProgram';
import getDiagnosticLocation from '../utils/getDiagnosticLocation';
import createCodeFrame from '../utils/createCodeFrame';

type ExtraOptions = {
  tsconfigPath?: string;
};

module.exports = (options: RunTestOptions<ExtraOptions>) => {
  const { testPath, config, extraOptions } = options;

  const start = Date.now();

  const { program, testPaths, error } = createTSProgram(
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
    const end = Date.now();

    const errorMessage = flattenDiagnosticMessageText(error.messageText, '\n');

    return fail({
      ...baseStatus,
      end,
      errorMessage,
    });
  }

  if (testPaths.includes(testPath)) {
    const emitResult = program.emit();

    const allDiagnostics = getPreEmitDiagnostics(program).concat(
      emitResult.diagnostics,
    );

    const errors = allDiagnostics
      .map((diagnostic) => {
        const errorMessage = flattenDiagnosticMessageText(
          diagnostic.messageText,
          '\n',
        );

        const location = getDiagnosticLocation(diagnostic);

        return {
          ...diagnostic,
          errorMessage,
          location,
        };
      })
      .map(({ file, errorMessage, location }) => {
        return createCodeFrame(errorMessage, file?.text, location);
      });

    const end = Date.now();

    if (errors.length === 0) {
      return pass({
        ...baseStatus,
        end,
      });
    }

    const errorMessage = errors.join('\n\n');

    return fail({
      ...baseStatus,
      end,
      errorMessage,
    });
  } else {
    const end = Date.now();

    return skip({
      ...baseStatus,
      end,
    });
  }
};
