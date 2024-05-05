import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start: startPosition, length: characterLength } = diagnostic;

  if (file) {
    if (typeof startPosition === 'number') {
      const lineAndCharacterStart = getLineAndCharacterOfPosition(
        file,
        startPosition,
      );

      if (typeof characterLength === 'number') {
        const endPosition = startPosition + characterLength;

        const lineAndCharacterEnd = getLineAndCharacterOfPosition(
          file,
          endPosition,
        );

        return {
          start: {
            line: lineAndCharacterStart.line + 1,
            column: lineAndCharacterStart.character + 1,
          },
          end: {
            line: lineAndCharacterEnd.line + 1,
            column: lineAndCharacterEnd.character + 1,
          },
        };
      }

      return {
        start: {
          line: lineAndCharacterStart.line + 1,
          column: lineAndCharacterStart.character + 1,
        },
      };
    }
  }
};

export default getDiagnosticLocation;
