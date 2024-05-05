import { Diagnostic, getLineAndCharacterOfPosition } from 'typescript';

const getDiagnosticLocation = (diagnostic: Diagnostic) => {
  if (diagnostic.file) {
    const { line: lineStart, character: characterStart } =
      getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);

    const { line: lineEnd, character: characterEnd } =
      getLineAndCharacterOfPosition(
        diagnostic.file,
        diagnostic.start + diagnostic.length,
      );

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
};

export default getDiagnosticLocation;
