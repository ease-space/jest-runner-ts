import { codeFrameColumns, SourceLocation } from '@babel/code-frame';
import { EOL } from 'os';

const createCodeFrameMessage = (
  message: string = '',
  rawLines?: string,
  location?: SourceLocation,
) => {
  if (rawLines && location) {
    const codeFrame = codeFrameColumns(rawLines, location, {
      highlightCode: true,
    });

    return message.concat(EOL).concat(codeFrame);
  } else {
    return message;
  }
};

export default createCodeFrameMessage;
