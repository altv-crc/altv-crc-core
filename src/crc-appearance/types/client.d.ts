import { Appearance } from '../shared/index';

declare module 'alt-client' {
    interface ICustomEmitEvent {
        'crc-appearance-apply': (ped: number, data: Appearance) => void;
    }
}
