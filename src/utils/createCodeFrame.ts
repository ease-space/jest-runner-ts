import { codeFrameColumns, SourceLocation } from '@babel/code-frame';
import { EOL } from 'os';

const createCodeFrame = (
  rawLines?: string,
  location?: SourceLocation,
  message?: string,
) => {
  if (rawLines && location) {
    const codeFrame = codeFrameColumns(rawLines, location, {
      highlightCode: true,
    });

    return message + EOL + codeFrame;
  } else {
    return message;
  }
};

export default createCodeFrame;
