import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import * as YAML from 'js-yaml';
import * as glob from 'glob';

function combineYamlFiles(directoryPath: string): OpenAPIObject {
  const pattern = `${ directoryPath }/**/*.yaml`;
  const files = glob.sync(pattern);
  const combinedSpec: OpenAPIObject = { info: undefined, openapi: '', paths: undefined };

  files.forEach((file) => {
    const yamlContent = YAML.load(fs.readFileSync(file, 'utf8'));
    Object.assign(combinedSpec, yamlContent);
  });

  combinedSpec.info = {
    title: 'F_NEST_I API',
    version: '1.0',
  };

  return combinedSpec;
}

export function setupSwagger(app: INestApplication): void {
  const combinedSpec = combineYamlFiles('./src/controllers');
  SwaggerModule.setup('api', app, combinedSpec);
}
