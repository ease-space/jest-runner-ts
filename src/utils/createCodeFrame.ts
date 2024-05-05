import { codeFrameColumns, SourceLocation } from '@babel/code-frame';

const createCodeFrame = (
  message: string = '',
  rawLines?: string,
  location?: SourceLocation,
) => {
  if (rawLines && location) {
    const codeFrame = codeFrameColumns(rawLines, location, {
      highlightCode: true,
    });

    return message ? message.concat('\n').concat(codeFrame) : codeFrame;
  } else {
    return message;
  }
};

export default createCodeFrame;
