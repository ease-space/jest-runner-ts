import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  const { file, start: positionStart, length: charactersLength } = diagnostic;

  if (file && typeof positionStart === 'number') {
    const lineAndCharacterStart = getLineAndCharacterOfPosition(
      file,
      positionStart,
    );

    const locationStart = {
      start: {
        line: lineAndCharacterStart.line + 1,
        column: lineAndCharacterStart.character + 1,
      },
    };

    if (typeof charactersLength === 'number') {
      const lineAndCharacterEnd = getLineAndCharacterOfPosition(
        file,
        positionStart + charactersLength,
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
};

export default getDiagnosticLocation;
