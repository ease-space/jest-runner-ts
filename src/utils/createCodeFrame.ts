import { codeFrameColumns, SourceLocation } from '@babel/code-frame';
import fs from 'fs';

const createCodeFrame = (
  filePath: string,
  message: string,
  location?: SourceLocation,
) => {
  if (location) {
    const rawLines = fs.readFileSync(filePath, 'utf8');

    return `${message}\n${codeFrameColumns(rawLines, location, {
      highlightCode: true,
    })}`;
  } else {
    return message;
  }
};

export default createCodeFrame;
