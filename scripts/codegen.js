const { generateApi } = require('swagger-typescript-api');
const path = require('path');

const fileName = 'api.ts';
const outputDir = path.resolve(process.cwd(), './src/shared/api/common');
const urlToSwaggerSchema = 'https://api.kinopoisk.dev/v1.3/documentation-json';

const pathToTemplate = path.resolve(process.cwd(), 'node_modules', 'effector-http-api/codegen-template');

generateApi({
	name: fileName,
	output: outputDir,
	url: urlToSwaggerSchema,
	httpClientType: 'axios',
	generateClient: true,
	templates: pathToTemplate,
});
