import { spawnSync, spawn, ChildProcess } from 'node:child_process';
import * as fs from 'node:fs';
import { createHash } from 'node:crypto';
import { getTimeStamp } from './shared.js';

const DEBOUNCE_TIME = 1000;

/** @type {ChildProcess} */
let altvProcess;
let npmCommand = process.platform.includes('win') ? 'npm.cmd' : 'npm';

/** @type {{ [filePath: string]: number }} */
let fileDebounce = {};

/** @type {{ [filePath: string]: string }} */
let fileContents = {};

fs.watch('src', { recursive: true }, async (eventType, fileName) => {
    if (eventType !== 'change' && eventType !== 'rename') {
        return;
    }

    if (!fileName) {
        return;
    }

    fileName = fileName.replace(/\\/gm, '/');

    if (fileDebounce[fileName] && Date.now() <= fileDebounce[fileName]) {
        return;
    }

    fileDebounce[fileName] = Date.now() + DEBOUNCE_TIME;

    const content = fs.readFileSync(`src/${fileName}`, { encoding: 'utf8' });
    const newHash = createHash('sha256').update(content).digest('hex');

    if (fileContents[fileName] && fileContents[fileName] === newHash) {
        return;
    }

    fileContents[fileName] = newHash;
    console.log(`[${getTimeStamp()}] File Changed: ${fileName}`);

    await spawnSync(npmCommand, ['run', 'build'], { stdio: 'inherit', cwd: process.cwd() });

    const resourceName = fileName.split('/')[0];
    if (fs.existsSync(`src/${resourceName}/reconnect.txt`)) {
        fs.writeFileSync('ipc.txt', `reconnect ${resourceName}`);
    } else {
        fs.writeFileSync('ipc.txt', `restart ${resourceName}`);
    }
});

try {
    fs.writeFileSync('ipc.txt', '');
    altvProcess = spawn(npmCommand, ['run', 'windows'], { stdio: 'inherit', cwd: process.cwd() });
} catch (err) {
    console.log(err);
}
