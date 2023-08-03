<script>
import {viewer} from "~/util/util.js";
import * as Cesium from "cesium";

const Sandcastle = [
  {
    //
    // To clamp points or billboards set the heightReference to CLAMP_TO_GROUND or RELATIVE_TO_GROUND
    //
    text: "Draw Point with Label",
    onselect: function () {
      viewer.trackedEntity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-122.1958, 46.1915),
        point: {
          color: Cesium.Color.SKYBLUE,
          pixelSize: 10,
          outlineColor: Cesium.Color.YELLOW,
          outlineWidth: 3,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
        label: {
          text: "Clamped to ground",
          font: "14pt sans-serif",
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
          verticalOrigin: Cesium.VerticalOrigin.BASELINE,
          fillColor: Cesium.Color.BLACK,
          showBackground: true,
          backgroundColor: new Cesium.Color(1, 1, 1, 0.7),
          backgroundPadding: new Cesium.Cartesian2(8, 4),
          disableDepthTestDistance: Number.POSITIVE_INFINITY, // draws the label in front of terrain
        },
      });
    },
  },
  {
    text: "Draw Billboard",
    onselect: function () {
      viewer.trackedEntity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(-122.1958, 46.1915),
        billboard: {
          image: "src/assets/facility.gif",
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        },
      });
    },
  },
  {
    //
    // Corridors, polygons and rectangles will be clamped automatically if they are filled with a constant color and
    // has no height or extruded height.
    // NOTE: Setting height to 0 will disable clamping.
    //
    text: "Draw Corridor",
    onselect: function () {
      const e = viewer.entities.add({
        corridor: {
          positions: Cesium.Cartesian3.fromDegreesArray([
            -122.19,
            46.1914,
            -122.21,
            46.21,
            -122.23,
            46.21,
          ]),
          width: 2000.0,
          material: Cesium.Color.GREEN.withAlpha(0.5),
        },
      });

      viewer.zoomTo(e);
    },
  },

]

export default {
  data(){
    return{
      SandcastleOption : Sandcastle,
      CurSandcastle : Sandcastle[0].text,
    }
  },
  methods:{
    selectChange:function (event){
      viewer.entities.removeAll();
      for (const eventKey in this.SandcastleOption)
      {
        console.log('selectChange',this.SandcastleOption[eventKey].text,this.CurSandcastle)
        if(this.SandcastleOption[eventKey].text === this.CurSandcastle)
        {
          this.SandcastleOption[eventKey].onselect();
          break;
        }
      }
    }
  },
  mounted() {
    Sandcastle[0].onselect();
  }
}

</script>

<template>
  <el-select v-model="CurSandcastle" class="m-2"  placeholder="Select"  @change="selectChange">
    <el-option
        v-for="item in SandcastleOption"
        :key="item.text"
        :label="item.text"
        :value="item.text"
    />
  </el-select>
</template>

<style scoped>

</style>