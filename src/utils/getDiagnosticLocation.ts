import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start, length } = diagnostic;

  if (file) {
    if (typeof start === 'number') {
      const lineAndCharacterStart = getLineAndCharacterOfPosition(file, start);

      const locationStart = {
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
          ...locationStart,
          end: {
            line: lineAndCharacterEnd.line + 1,
            column: lineAndCharacterEnd.character + 1,
          },
        };
      }

      return locationStart;
    }
  }
};

export default getDiagnosticLocation;
