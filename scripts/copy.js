import * as fs from 'node:fs';
import * as glob from 'glob';
import { getResources, getTimeStamp } from './shared.js';

const startTime = Date.now();
let filesCopied = 0;

async function copyResourceAssets(name) {
    const files = glob.sync(`./src/${name}/**/*.!(ts)`, { platform: 'linux' });

    for (let filePath of files) {
        if (filePath.includes(`src/${name}/types`)) {
            continue;
        }

        const finalPath = filePath.replace('src/', 'resources/');

        const splitFinalPath = finalPath.split('/');
        splitFinalPath.pop();
        const directoryToMake = splitFinalPath.join('/');
        fs.mkdirSync(directoryToMake, { recursive: true });

        fs.copyFileSync(filePath, finalPath);
        filesCopied += 1;
    }
}

for (let resource of getResources()) {
    copyResourceAssets(resource);
}

console.log(`[${getTimeStamp()}] ${filesCopied} Files Copied | ${Date.now() - startTime}ms`);
