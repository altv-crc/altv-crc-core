import * as alt from 'alt-server';
import * as fs from 'fs';
import { connectLocalClient } from './reconnect';

const DEBOUNCE_TIME = 1000;
let lastUpdate = Date.now();
let wasReconnect = false;
let lastResourceRestarted: string;

if (alt.debug) {
    if (!fs.existsSync('ipc.txt')) {
        fs.writeFileSync('ipc.txt', '');
    }

    alt.on('anyResourceStart', (resourceName: string) => {
        if (!lastResourceRestarted) {
            return;
        }

        if (lastResourceRestarted !== resourceName) {
            return;
        }

        lastResourceRestarted = undefined;
        connectLocalClient();
    });

    alt.setInterval(() => {
        const cmd = fs.readFileSync('ipc.txt', 'utf-8');
        if (cmd === '') {
            return;
        }

        const cmdSplit = cmd.split(' ');
        if (Date.now() < lastUpdate) {
            return;
        }

        lastUpdate = Date.now() + DEBOUNCE_TIME;
        wasReconnect = false;

        fs.writeFileSync('ipc.txt', '');

        const [commandName, parameter] = cmdSplit;

        if (commandName === 'restart') {
            alt.logWarning(`Restart Request for ${parameter}`);
            if (alt.hasResource(parameter)) {
                alt.restartResource(parameter);
                return;
            }

            alt.startResource(parameter);
            return;
        }

        if (commandName === 'reconnect') {
            alt.logWarning(`Restart + Reconnect Request for ${parameter}`);
            wasReconnect = true;
            lastResourceRestarted = parameter;

            alt.Player.all.forEach((player) => {
                player.kick('Force Reconnect, Rejoin Server');
            });

            if (alt.hasResource(parameter)) {
                alt.restartResource(parameter);
                return;
            }

            alt.startResource(parameter);

            return;
        }
    }, 500);
}
