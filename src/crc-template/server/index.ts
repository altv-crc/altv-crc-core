import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
    player.pos = new alt.Vector3(5, 5, 78);
    player.model = 'mp_m_freemode_01';
});

console.log('hi');
console.log('test');
console.log('hi blah');
