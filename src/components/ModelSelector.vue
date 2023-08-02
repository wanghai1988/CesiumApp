<script  >
import * as Cesium from 'cesium';
import {createModel} from "~/util/util.js";

const options = [
  {
    text: "Aircraft",
    value:{
      url:  "src/assets/model/Cesium_Air.glb",
      height: 5000.0,
    },
  },
  {
    text: "Drone",
    value:{
      url:  "src/assets/model/CesiumDrone.glb",
      height:    150.0,
    },
  },
  {
    text: "Ground Vehicle",
    value:{
      url:  "src/assets/model/GroundVehicle.glb",
      height:  0,
    },
  },
  {
    text: "Hot Air Balloon",
    value:{
      url:   "src/assets/model/CesiumBalloon.glb",
      height:   1000.0,
    },
  },
  {
    text: "Milk Truck",
    value:{
      url:  "src/assets/model/CesiumMilkTruck.glb",
      height:  0,
    },
  },
  {
    text: "Skinned Character",
    value:{
      url:  "src/assets/model/Cesium_Man.glb",
      height:  0,
    },
  },
  {
    text: "Unlit Box",
    value:{
      url: "src/assets/model/BoxUnlit.gltf",
      height:  10,
    },
  },
  {
    text: "Draco Compressed Model",
    value:{
      url: "src/assets/model/CesiumMilkTruck.gltf",
      height:  10,
    },
  },
  {
    text: "KTX2 Compressed Balloon",
    value:{
      url: "src/assets/model/CesiumBalloonKTX2.glb",
      height:  1000,
    },
  },
  {
    text: "Instanced Box",
    value:{
      url:"src/assets/model/BoxInstanced.gltf",
      height:  15,
    },
  },
];
export default {
  data(){
    return {
      modelList :options,
      value:null
    }
  },
  methods:{
    selectChange:function (event){
    createModel(this.value.value.url,this.value.value.height)
    },
  }
}
</script>

<template>
  <el-select v-model="value" class="m-2"  placeholder="Select"  @change="selectChange">
    <el-option
        v-for="item in modelList"
        :key="item.text"
        :label="item.text"
        :value="item"
    />
  </el-select>
</template>

<style scoped>

</style>