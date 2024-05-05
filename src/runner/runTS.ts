import { RunTestOptions, fail, pass } from 'create-jest-runner';
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
    const end = Date.now();

    const errorMessage = flattenDiagnosticMessageText(error.messageText, '\n');

    return fail({
      ...baseStatus,
      end,
      errorMessage,
    });
  }

  const emitResult = program.emit();

  const allDiagnostics = getPreEmitDiagnostics(program).concat(
    emitResult.diagnostics,
  );

  const errors = allDiagnostics
    .map((diagnostic) => {
      // if (diagnostic.file) {
      //   const errorMessage = flattenDiagnosticMessageText(
      //     diagnostic.messageText,
      //     '\n',
      //   );
      //
      //   const { line: lineStart, character: characterStart } =
      //     getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
      //
      //   const { line: lineEnd, character: characterEnd } =
      //     getLineAndCharacterOfPosition(
      //       diagnostic.file,
      //       diagnostic.start + diagnostic.length,
      //     );
      //
      //   const location = {
      //     start: {
      //       line: lineStart + 1,
      //       column: characterStart + 1,
      //     },
      //     end: {
      //       line: lineEnd + 1,
      //       column: characterEnd + 1,
      //     },
      //   };
      //
      //   return {
      //     ...diagnostic,
      //     errorMessage,
      //     location,
      //   };
      // } else {
      //   const errorMessage = flattenDiagnosticMessageText(
      //     diagnostic.messageText,
      //     '\n',
      //   );
      //
      //   return {
      //     ...diagnostic,
      //     errorMessage,
      //   };
      // }

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
    .map((diagnostic) => {
      // return createCodeFrame(
      //   diagnostic.errorMessage,
      //   diagnostic.file?.text,
      //   diagnostic.location,
      // );
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
};
