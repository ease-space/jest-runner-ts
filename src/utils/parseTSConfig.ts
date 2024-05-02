import path from 'path';
import ts from 'typescript';

const parseTSConfig = (
  rootDir: string = process.cwd(),
  tsconfigPath: string = path.resolve(rootDir, 'tsconfig.json'),
) => {
  const { config, error } = ts.readConfigFile(tsconfigPath, ts.sys.readFile);


};

export default parseTSConfig;
