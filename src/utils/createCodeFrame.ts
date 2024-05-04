import { codeFrameColumns } from '@babel/code-frame';

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

const createCodeFrame = (
  filePath: string,
  errorMessage: string,
  errorLocation: CodeFrameErrorLocation,
) => {};

export default createCodeFrame;
