// 这个是generate：api用到的
import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: 'http://localhost:3000/api-docs.json',
  output: 'src/api/generated',
  plugins: ['@hey-api/client-axios'],
});