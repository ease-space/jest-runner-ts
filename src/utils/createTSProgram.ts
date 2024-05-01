import fs from 'fs';
import ts from 'typescript';

const createTSProgram = (tsconfigPath: string, testPath: string) => {
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
};

export default createTSProgram;
