import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start, length } = diagnostic;

  if (file) {
    if (typeof start === 'number') {
      const lineAndCharacterStart = getLineAndCharacterOfPosition(file, start);

      const location = {
        start: {
          line: lineAndCharacterStart.line + 1,
          column: lineAndCharacterStart.character + 1,
        },
      };

      if (typeof length === 'number') {
        const lineAndCharacterEnd = getLineAndCharacterOfPosition(
          file,
          start + length,
        );

        return {
          ...location,
          end: {
            line: lineAndCharacterEnd.line + 1,
            column: lineAndCharacterEnd.character + 1,
          },
        };
      }

      return location;
    }
  }
};

export default getDiagnosticLocation;
