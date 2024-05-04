import { codeFrameColumns, SourceLocation } from '@babel/code-frame';
import fs from 'fs';

const createErrorCodeFrame = (
  filePath: string,
  errorMessage: string,
  errorLocation: SourceLocation,
) => {
  const rawLines = fs.readFileSync(filePath, 'utf8');

  return `${errorMessage}\n${codeFrameColumns(rawLines, errorLocation, {
    highlightCode: true,
  })}`;
};

export default createErrorCodeFrame;
