import kill from 'fkill';

// Kills previous iteration of the altv-server if present

try {
    kill(':7788', { silent: true, force: true })
} catch (err) { }
