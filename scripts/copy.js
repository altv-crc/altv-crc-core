import * as fs from 'node:fs';
import * as glob from 'glob';
import { getResources, normalizeFilePath, getTimeStamp } from './shared.js';

async function copyResourceAssets(name) {
    const startTime = Date.now();
    const files = glob.sync(`./src/${name}/**/*.!(ts)`, { platform: 'linux' });

    let filesCopied = 0;
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

    console.log(`[${getTimeStamp()}] [${name}] | ${filesCopied} Files Moved | ${Date.now() - startTime}ms`);
}

for (let resource of getResources()) {
    copyResourceAssets(resource);
}
