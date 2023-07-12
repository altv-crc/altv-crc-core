import * as alt from 'alt-server';

alt.on('crc-appearance-apply', (player, data) => {
    if (data.sex === 0) {
        player.model = 'mp_f_freemode_01';
    } else {
        player.model = 'mp_m_freemode_01';
    }

    // Set Face
    player.clearBloodDamage();
    player.setHeadBlendData(
        data.faceMother,
        data.faceFather,
        0,
        data.skinMother,
        data.skinFather,
        0,
        parseFloat(data.faceMix.toString()),
        parseFloat(data.skinMix.toString()),
        0
    );

    // Facial Features
    for (let i = 0; i < data.microMorphs.length; i++) {
        const value = data.microMorphs[i];
        player.setFaceFeature(i, value);
    }

    // Hair - Tattoo
    const decorationsToSync = [];
    if (data.hairOverlay) {
        decorationsToSync.push(data.hairOverlay);
    }

    if (decorationsToSync.length >= 1) {
        alt.emitClient(player, 'crc-appearance-set-decorations', decorationsToSync);
    }

    // Hair - Supports DLC
    if (typeof data.hairDlc === 'undefined' || data.hairDlc === 0) {
        player.setClothes(2, data.hair, 0, 0);
    } else {
        player.setDlcClothes(data.hairDlc, 2, data.hair, 0, 0);
    }

    player.setHairColor(data.hairColor1);
    player.setHairHighlightColor(data.hairColor2);

    // Facial Hair
    player.setHeadOverlay(1, data.facialHair, data.facialHairOpacity);
    player.setHeadOverlayColor(1, 1, data.facialHairColor1, data.facialHairColor1);

    // Chest Hair
    if (data.chestHair !== null && data.chestHair !== undefined) {
        player.setHeadOverlay(10, data.chestHair, data.chestHairOpacity);
        player.setHeadOverlayColor(10, 1, data.chestHairColor1, data.chestHairColor1);
    }

    // Eyebrows
    player.setHeadOverlay(2, data.eyebrows, data.eyebrowsOpacity);
    player.setHeadOverlayColor(2, 1, data.eyebrowsColor1, data.eyebrowsColor1);

    // Decor
    for (let i = 0; i < data.headOverlays.length; i++) {
        const overlay = data.headOverlays[i];
        const color2 = overlay.color2 ? overlay.color2 : overlay.color1;

        player.setHeadOverlay(overlay.id, overlay.value, parseFloat(overlay.opacity.toString()));
        player.setHeadOverlayColor(overlay.id, 1, overlay.color1, color2);
    }

    // Eyes
    player.setEyeColor(data.eyes);
});
