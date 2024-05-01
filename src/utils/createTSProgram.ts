import fs from 'fs';
import ts from 'typescript';

const createTSProgram = (tsconfigPath: string, fileTestPath: string) => {
  const configContents = fs.readFileSync(tsconfigPath).toString();

  const { config, error } = ts.parseConfigFileTextToJson(
    tsconfigPath,
    configContents,
  );

  const settings = ts.convertCompilerOptionsFromJson(config, process.cwd());

  const options = Object.assign({}, { noEmit: true }, settings.options);

  const program = ts.createProgram([fileTestPath], options);

  return {
    program,
    error,
  };
};

export default createTSProgram;
