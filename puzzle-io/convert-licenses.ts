import * as fs from 'fs';
import * as path from 'path';
import { licenses } from './src/config/licenses';

const outputFilePath = path.resolve(
  __dirname,
  'assets',
  'third-party-licenses.txt',
);

// Convert the license data to text format
let licenseText = '';
licenses.forEach((license) => {
  license.sources.forEach((source) => {
    licenseText += `== License for "${source}" ==\n`;
  });
  licenseText += `Title: ${license.title}\n`;
  licenseText += `License: ${license.license}\n`;
  licenseText += `Disclaimer: ${license.disclaimer}\n\n`;
});

fs.writeFileSync(outputFilePath, licenseText, 'utf8');
console.log('License file generated at:', outputFilePath);
