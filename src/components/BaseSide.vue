<script>
import {Document, Setting,} from "@element-plus/icons-vue";
const menuItems =[
  {
    text:"3D Models",
    imgUrl:"src/assets/3D Models.jpg",
  },
  {
    text:"3D Models Coloring",
    imgUrl:"src/assets/3D Models Coloring.jpg",
  }
];
export default {
  data(){
    return {
      items:menuItems,
    }
  },
  methods:{
    open3DModel:function (item){
      console.log("item",item)
      this.$emit("ItemChange",item.text)
    },

  }
}
</script>

<template>
  <el-menu
      default-active="2"
  >
    <el-menu-item
        v-for="item in items" :key="item.text" style="height: auto;padding-top: 5px;padding-left: 5px;padding-right: 5px" @click="open3DModel(item)">
      <el-card style="width: 100%" :body-style="{ padding: '5px'}">
        <div style="text-align: center">
          <span> {{item.text}}</span>
        </div>
        <img
            :src=item.imgUrl
            class="image"
            alt=""/>
      </el-card>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>
.image {
  width: 100%;
}
</style>