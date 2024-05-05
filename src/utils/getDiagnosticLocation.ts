import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start: startPosition, length: characterLength } = diagnostic;

  if (file) {
    if (typeof startPosition === 'number') {
      const { line: lineStart, character: characterStart } =
        getLineAndCharacterOfPosition(file, startPosition);

      if (typeof characterLength === 'number') {
        const { line: lineEnd, character: characterEnd } =
          getLineAndCharacterOfPosition(file, startPosition + characterLength);

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
  }
};

export default getDiagnosticLocation;
