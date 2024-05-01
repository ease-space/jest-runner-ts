import path from 'path';
import fs from 'fs';
import ts from 'typescript';

const createTSProgram = (
  rootDir: string,
  testPath: string,
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const isExist = fs.existsSync(tsconfigPath);

  if (isExist) {
    const tsconfigJsonText = fs.readFileSync(tsconfigPath).toString();

    const { config, error } = ts.parseConfigFileTextToJson(
      tsconfigPath,
      tsconfigJsonText,
    );

    const settings = ts.convertCompilerOptionsFromJson(config, process.cwd());

    const options = Object.assign({}, { noEmit: true }, settings.options);

    const program = ts.createProgram([testPath], options);

    return {
      program,
      error,
    };
  } else {
    throw new Error('No such tsconfig file');
  }
};

export default createTSProgram;
