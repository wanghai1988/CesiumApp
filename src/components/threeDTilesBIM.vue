<script >
import {viewer} from "~/util/util.js";
import * as Cesium from "cesium";

export default {
  data(){
    return {
      showClassification:false,
      selectedFeature:null,
    }
  },
  methods:{
    pickingChange:function (event){
      if(!this.picking){
        this.unselectFeature(this.selectedFeature);
      }
    },
    unselectFeature:function (feature){

    }
  },
  mounted() {
    try {
      // A normal b3dm tileset containing photogrammetry
      const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(40866);
      viewer.scene.primitives.add(tileset);
      viewer.zoomTo(tileset);

      const classificationTilesetUrl =
          "../SampleData/Cesium3DTiles/Classification/Photogrammetry/tileset.json";
      // A b3dm tileset used to classify the photogrammetry tileset
      const classificationTileset = await Cesium.Cesium3DTileset.fromUrl(
          classificationTilesetUrl,
          {
            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
          }
      );
      classificationTileset.style = new Cesium.Cesium3DTileStyle({
        color: "rgba(255, 0, 0, 0.5)",
      });
      viewer.scene.primitives.add(classificationTileset);

      // The same b3dm tileset used for classification, but rendered normally for comparison.
      const nonClassificationTileset = await Cesium.Cesium3DTileset.fromUrl(
          classificationTilesetUrl,
          {
            show: false,
          }
      );
      nonClassificationTileset.style = new Cesium.Cesium3DTileStyle({
        color: "rgba(255, 0, 0, 0.5)",
      });
      viewer.scene.primitives.add(nonClassificationTileset);
  },
}
</script>

<template>
  <el-checkbox v-model="showClassification" label="Show classification" size="large" @change="pickingChange"/>
</template>

<style scoped>

</style>