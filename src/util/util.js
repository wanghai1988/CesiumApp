import * as Cesium from 'cesium';

export var viewer;

export function initCesium() {
    const worldTerrain = Cesium.createWorldTerrain({
        requestWaterMask: true, // 添加水面波浪效果
        requestVertexNormals: true // 添加地形光照
    });
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxYTY1MGU1Ni04ZTNmLTRjYWUtODg2My00OTA3NjAzOWZlZjAiLCJpZCI6MTM1MTA1LCJpYXQiOjE2OTA4NzAwNTJ9.thbwGjb0BPAM00q1c_pEUbwYkQN9W0POVvCD56gOpMU';
    viewer = new Cesium.Viewer('cesiumContainer',{
        geocoder:false,
        homeButton:false,
        timeline:false,
        navigationHelpButton:false,
        animation:false,
        fullscreenButton:false,
        sceneModePicker:false,
        baseLayerPicker:false,
        terrainProvider: worldTerrain,
        infoBox: false,
        selectionIndicator: false,
        shadows: true,
        shouldAnimate: true,
    });
}

export  function createModel(url, height){
    viewer.entities.removeAll();
    const position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
    );
    viewer.trackedEntity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000,
        },
    });

}


export  function createModelByMode(url, height,viewMode){
    viewer.entities.removeAll();

    const position = Cesium.Cartesian3.fromDegrees(
        -123.0744619,
        44.0503706,
        height
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
        position,
        hpr
    );

    viewer.trackedEntity = viewer.entities.add({
        name: url,
        position: position,
        orientation: orientation,
        model: {
            uri: url,
            minimumPixelSize: 128,
            maximumScale: 20000,
            color: getColor(viewMode.color, viewMode.alpha),
            colorBlendMode: getColorBlendMode(viewMode.colorBlendMode),
            colorBlendAmount: parseFloat(viewMode.colorBlendAmount),
            silhouetteColor: getColor(
                viewMode.silhouetteColor,
                viewMode.silhouetteAlpha
            ),
            silhouetteSize: parseFloat(viewMode.silhouetteSize),
        },
    })
}

export function getColor(colorName, alpha){
    const color = Cesium.Color[colorName.toUpperCase()];
    return Cesium.Color.fromAlpha(color, parseFloat(alpha));
}

export  function getColorBlendMode(colorBlendMode) {
    return Cesium.ColorBlendMode[colorBlendMode.toUpperCase()];
}