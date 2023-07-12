import * as alt from 'alt-client';
import * as native from 'natives';
import * as I from '../shared/index';

const defaultAppearance: I.Appearance = {
    sex: 0,
    faceFather: 0,
    faceMother: 0,
    faceMix: 0.5,
    skinFather: 0,
    skinMother: 0,
    skinMix: 0.5,
    eyes: 0,
    eyebrows: 0,
    eyebrowsOpacity: 1,
    eyebrowsColor1: 0,
    chestHair: 0,
    chestHairOpacity: 0,
    chestHairColor1: 0,
    facialHair: 0,
    facialHairOpacity: 0,
    facialHairColor1: 0,
    hair: 0,
    hairColor1: 0,
    hairColor2: 0,
    headOverlays: [
        { id: 0, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 3, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 4, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 5, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 6, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 7, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 8, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 9, opacity: 0, color1: 0, color2: 0, value: 0 },
        { id: 10, opacity: 0, color1: 0, color2: 0, value: 0 },
    ],
    microMorphs: new Array(20).fill(0),
    hairDlc: 0,
    hairOverlay: { collection: '', overlay: '' },
};

alt.on('crc-appearance-apply', (ped: number, data: I.Appearance) => {
    data = Object.assign(defaultAppearance, data);

    native.clearPedDecorations(ped);
    native.setPedHeadBlendData(ped, 0, 0, 0, 0, 0, 0, 0, 0, 0, false);
    native.setPedHeadBlendData(
        ped,
        data.faceFather,
        data.faceMother,
        0,
        data.skinFather,
        data.skinMother,
        0,
        data.faceMix,
        data.skinMix,
        0,
        false
    );

    // Hair
    native.setPedComponentVariation(ped, 2, data.hair, 0, 0);
    native.setPedHairTint(ped, data.hairColor1, data.hairColor2);

    // Hair Overlay
    native.addPedDecorationFromHashes(ped, alt.hash(data.hairOverlay.collection), alt.hash(data.hairOverlay.overlay));

    // Eyebrows
    native.setPedHeadOverlay(ped, 2, data.eyebrows, data.eyebrowsOpacity);
    native.setPedHeadOverlayTint(ped, 2, 1, data.eyebrowsColor1, data.eyebrowsColor1);

    // Facial Hair
    native.setPedHeadOverlay(ped, 1, data.facialHair, data.facialHairOpacity);
    native.setPedHeadOverlayTint(ped, 1, 1, data.facialHairColor1, data.facialHairColor1);

    // Default Clothes for Even Customization
    native.setPedComponentVariation(ped, 6, 1, 0, 0);

    if (data.sex === 0) {
        native.setPedComponentVariation(ped, 3, 3, 0, 0);
        native.setPedComponentVariation(ped, 8, 14, 0, 0);
        native.setPedComponentVariation(ped, 11, 407, 0, 0);
    } else {
        native.setPedComponentVariation(ped, 3, 4, 0, 0);
        native.setPedComponentVariation(ped, 8, 15, 0, 0);
        native.setPedComponentVariation(ped, 11, 384, 0, 0);
    }

    for (let i = 0; i < data.microMorphs.length; i++) {
        native.setPedMicroMorph(ped, i, data.microMorphs[i]);
    }

    for (let i = 0; i < data.headOverlays.length; i++) {
        native.setPedHeadOverlay(
            ped,
            data.headOverlays[i].id,
            data.headOverlays[i].value,
            data.headOverlays[i].opacity
        );
        native.setPedHeadOverlayTint(
            ped,
            data.headOverlays[i].id,
            2,
            data.headOverlays[i].color1,
            data.headOverlays[i].color2
        );
    }

    native.setHeadBlendEyeColor(ped, data.eyes);
});

alt.onServer('crc-appearance-set-decorations', (data: Array<{ collection: string; overlay: string }>) => {
    native.clearPedDecorations(alt.Player.local.scriptID);
    for (let tattoo of data) {
        native.addPedDecorationFromHashes(
            alt.Player.local.scriptID,
            alt.hash(tattoo.collection),
            alt.hash(tattoo.overlay)
        );
    }
});
