import * as alt from 'alt-server';
import { Appearance } from '../shared/index';

declare module 'alt-server' {
    interface ICustomEmitEvent {
        'crc-appearance-apply': (player: alt.Player, data: Appearance) => void;
    }
}
