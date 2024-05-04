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

    return message.concat('\n').concat(codeFrame);
  } else {
    return message;
  }
};

export default createCodeFrame;
