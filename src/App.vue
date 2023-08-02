<script >
import * as Cesium from 'cesium';
import {onMounted} from "vue";
import {initCesium} from "~/util/util.js";

export default {
  data(){
    return{
      curMenu:null,
    }
  },
  methods:{
    menuChange:function (menuText){
      console.log('menuChange',menuText)
      this.curMenu = menuText
    }
  },

  mounted() {
   initCesium();
  }
}

</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="flex main-container">
        <BaseSide  @ItemChange = "menuChange"/>
        <div id="cesiumContainer"></div>
      <ModelSelector v-if = "curMenu === '3D Models'"  style=" margin-left:260px;position:absolute"></ModelSelector>
      <ModelColorConfig v-if = "curMenu === '3D Models Coloring'"  style=" margin-left:260px;margin-top:10px;position:absolute"></ModelColorConfig>
    </div>
  </el-config-provider>
</template>

<style scoped>

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 3px);
}
</style>
