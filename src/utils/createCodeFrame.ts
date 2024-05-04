import { codeFrameColumns, SourceLocation } from '@babel/code-frame';

const createCodeFrame = (
  rawLines?: string,
  location?: SourceLocation,
  message?: string,
) => {
  if (rawLines && location) {
    return `${message}\n${codeFrameColumns(rawLines, location, {
      highlightCode: true,
    })}`;
  } else {
    return message;
  }
};

export default createCodeFrame;
