import { codeFrameColumns } from '@babel/code-frame';
import fs from 'fs';

type CodeFrameErrorLocation = {
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number;
    column: number;
  };
};

const createErrorCodeFrame = (
  filePath: string,
  errorMessage: string,
  errorLocation: CodeFrameErrorLocation,
) => {
  const rawLines = fs.readFileSync(filePath, 'utf8');

  return `${errorMessage}\n${codeFrameColumns(rawLines, errorLocation, {
    highlightCode: true,
  })}`;
};

export default createErrorCodeFrame;
