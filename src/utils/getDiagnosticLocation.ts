import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start: startPosition, length: characterLength } = diagnostic;

  if (file && typeof start === 'number') {
    const { line: lineStart, character: characterStart } =
      getLineAndCharacterOfPosition(file, start);

    if (length) {
      const { line: lineEnd, character: characterEnd } =
        getLineAndCharacterOfPosition(file, start + length);

      return {
        start: {
          line: lineStart + 1,
          column: characterStart + 1,
        },
        end: {
          line: lineEnd + 1,
          column: characterEnd + 1,
        },
      };
    }

    return {
      start: {
        line: lineStart + 1,
        column: characterStart + 1,
      },
    };
  }
};

export default getDiagnosticLocation;
