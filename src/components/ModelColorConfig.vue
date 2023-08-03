<script>

import * as Cesium from 'cesium';
import {createModelByMode, getColor, getColorBlendMode, viewer} from "~/util/util.js";

const options = [
  {
    text: "Aircraft",
    value: {
      url: "src/assets/model/Cesium_Air.glb",
      height: 5000.0,
    },
  },
  {
    text: "Ground Vehicle",
    value: {
      url: "src/assets/model/GroundVehicle.glb",
      height: 0,
    },
  },
  {
    text: "Hot Air Balloon",
    value: {
      url: "src/assets/model/CesiumBalloon.glb",
      height: 1000,
    },
  },
  {
    text: "Milk Truck",
    value: {
      url: "src/assets/model/CesiumMilkTruck.glb",
      height: 0,
    },
  },
  {
    text: "Skinned Character",
    value: {
      url: "src/assets/model/Cesium_Man.glb",
      height: 0,
    },
  },
];
const viewModel = {
  color: "Red",
  colors: ["White", "Red", "Green", "Blue", "Yellow", "Gray"],
  alpha: 1.0,
  colorBlendMode: "Highlight",
  colorBlendModes: ["Highlight", "Replace", "Mix"],
  colorBlendAmount: 0.5,
  colorBlendAmountEnabled: false,
  silhouetteColor: "Red",
  silhouetteColors: ["Red", "Green", "Blue", "Yellow", "Gray"],
  silhouetteAlpha: 1.0,
  silhouetteSize: 2.0,
};
export default {
  data() {
    return {
      viewModel:viewModel,
      modelList: options,
      curMode: options[0],
      shadows: true,
      entity:null,
    }
  },
  methods: {
    selectChange: function (event) {
      console.log(this.curMode);
      this.entity = createModelByMode(this.curMode.value.url, this.curMode.value.height,this.viewModel)
    },

    colorBlendModeChange:function (event){
      const blendMode = getColorBlendMode(this.viewModel.colorBlendMode);
      this.entity.model.colorBlendMode = blendMode;
      this.viewModel.colorBlendAmountEnabled =
          blendMode === Cesium.ColorBlendMode.MIX;
    },
    colorChange:function (event){
      this.entity.model.color = getColor(this.viewModel.color, this.viewModel.alpha);
    },
    alphaChange:function (event){
      this.entity.model.color = getColor(this.viewModel.color, this.viewModel.alpha);
    },
    mixChange:function (event){
      this.entity.model.colorBlendAmount = this.colorBlendAmount;
    },
    silhouetteColorChange:function (event){
      this.entity.model.silhouetteColor = getColor(this.viewModel.silhouetteColor,this.viewModel.silhouetteAlpha);
    },
    silhouetteAlphaChange:function (event){
      this.entity.model.silhouetteColor = getColor(this.viewModel.silhouetteColor,this.viewModel.silhouetteAlpha);
    },
    silhouetteSizeChange:function (event){
      this.entity.model.silhouetteSize = this.viewModel.silhouetteSize;
    },
    shadowsChange:function (event){
      viewer.shadows = this.shadows;
    },
  },
  mounted() {
    console.log("ModelColorConfig","mounted");
    this.entity = createModelByMode(this.curMode.value.url, this.curMode.value.height,this.viewModel);
  }
}
</script>

<template>
  <el-card class="box-card">
    <el-row class="row">
      <el-col :span="24">
        <div class="card-header">Model Color</div>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="5">
        <div>Mode</div>
      </el-col>
      <el-col :span="12">
        <el-select v-model="viewModel.colorBlendMode" size="small" @change="colorBlendModeChange">
          <el-option
              v-for="item in viewModel.colorBlendModes"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5">
        <div>Color</div>
      </el-col>
      <el-col :span="12">
        <el-select v-model="viewModel.color" size="small" @change="colorChange">
          <el-option
              v-for="item in viewModel.colors"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5">
        <div>Alpha</div>
      </el-col>
      <el-col :span="19">
        <el-slider v-model="viewModel.alpha" input-size="small" :min=0 :max=1.0 :step=0.01 show-input @change="alphaChange"/>
      </el-col>
    </el-row>

    <el-row class="row" >
      <el-col :span="5">
        <div>Mix</div>
      </el-col>
      <el-col :span="19">
        <el-slider v-model="viewModel.colorBlendAmount" input-size="small" show-input :min=0 :max=1.0 :step=0.01 @change="mixChange" :disabled="viewModel.colorBlendMode !== 'Mix'"/>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="card-header">Model Silhouette</div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5">
        <div>Color</div>
      </el-col>
      <el-col :span="12">
        <el-select v-model="viewModel.silhouetteColor" size="small" @change="silhouetteColorChange"
        >
          <el-option
              v-for="item in viewModel.silhouetteColors"
              :key="item"
              :label="item"
              :value="item"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5">
        <div>Alpha</div>
      </el-col>
      <el-col :span="19">
        <el-slider v-model="viewModel.silhouetteAlpha" input-size="small" show-input @change="silhouetteAlphaChange" />
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5">
        <div>Size</div>
      </el-col>
      <el-col :span="19">
        <el-slider v-model="viewModel.silhouetteSize" :show-input-controls="false" input-size="small" show-input @change="silhouetteSizeChange"/>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="12">
        <el-select v-model="curMode" placeholder="Select" @change="selectChange">
          <el-option
              v-for="item in modelList"
              :key="item.text"
              :label="item.text"
              :value="item"
          />
        </el-select>
      </el-col>
      <el-col :span="6">
        <el-checkbox v-model="shadows" label="Shadows" size="large" @change="shadowsChange"/>
      </el-col>
    </el-row>

  </el-card>
</template>

<style scoped>
.box-card {
  width: 480px;
}

.ep-row {
  margin-bottom: 5px;
}

.ep-row:last-child {
  margin-bottom: 0;
}
.box-card{
  opacity: 0.8;
}
</style>