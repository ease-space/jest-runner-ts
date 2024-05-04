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

const createErrorCodeFrame = (
  filePath: string,
  errorMessage: string,
  errorLocation: CodeFrameErrorLocation,
) => {};

export default createErrorCodeFrame;
