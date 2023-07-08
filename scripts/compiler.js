import fs from 'node:fs';
import * as glob from 'glob';
import swc from '@swc/core';
import { getResources, getTimeStamp, normalizeFilePath } from './shared.js';

/** @type {swc.Config} */
const SWC_CONFIG = {
    jsc: {
        parser: {
            syntax: 'typescript',
            dynamicImport: true,
            decorators: true
        },
        transform: {
            legacyDecorator: true,
            decoratorMetadata: true,
        },
        target: 'es2020',
    },
    sourceMaps: false,
};

let compileCount = 0;
const startTime = Date.now();

async function buildTargetResource(name) {
    if (fs.existsSync(`resources/${name}`)) {
        fs.rmSync(`resources/${name}`, { force: true, recursive: true });
    }

    const filesToCompile = glob.sync(`./src/${name}/**/*.ts`, { platform: 'linux' });
    for (let i = 0; i < filesToCompile.length; i++) {
        const filePath = filesToCompile[i]
        if (filePath.includes(`src/${name}/types`)) {
            continue;
        }

        const finalPath = filePath.replace('src/', 'resources/').replace('.ts', '.js');
        const compiled = swc.transformFileSync(filePath, SWC_CONFIG);

        const splitFinalPath = finalPath.split('/');
        splitFinalPath.pop();
        const directoryToMake = splitFinalPath.join('/');
        fs.mkdirSync(directoryToMake, { recursive: true });

        fs.writeFileSync(finalPath, compiled.code, { encoding: 'utf-8', });
        compileCount += 1;
    }



}

for (let resource of getResources()) {
    buildTargetResource(resource);
}

console.log(`[${getTimeStamp()}] Built ${compileCount} Files | ${Date.now() - startTime}ms`);