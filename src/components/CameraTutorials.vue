<script>
import {getFlagForKeyCode, viewer} from "~/util/util.js";
import * as Cesium from "cesium";

const flags = {
  looking: false,
  moveForward: false,
  moveBackward: false,
  moveUp: false,
  moveDown: false,
  moveLeft: false,
  moveRight: false,
};

let startMousePosition=null
let mousePosition =null

export default {
  data() {
    return {


    }
  },

  methods: {
    onLeftDown: function (movement) {
      flags.looking = true;
      mousePosition =  Cesium.Cartesian3.clone(
          movement.position
      );
      startMousePosition =Cesium.Cartesian3.clone(
          movement.position
      );
    },
    onMouseMove: function (movement) {
      mousePosition = movement.endPosition;
    },
    onLeftUp: function (movement) {
      flags.looking = false;
    },


  },

  mounted() {
    const scene = viewer.scene;
    const canvas = viewer.canvas;
    canvas.setAttribute("tabindex", "0"); // needed to put focus on the canvas
    canvas.onclick = function () {
      canvas.focus();
    };
    const ellipsoid = scene.globe.ellipsoid;
    scene.screenSpaceCameraController.enableRotate = false;
    scene.screenSpaceCameraController.enableTranslate = false;
    scene.screenSpaceCameraController.enableZoom = false;
    scene.screenSpaceCameraController.enableTilt = false;
    scene.screenSpaceCameraController.enableLook = false;
    const handler = new Cesium.ScreenSpaceEventHandler(canvas);

    handler.setInputAction(this.onLeftDown, Cesium.ScreenSpaceEventType.LEFT_DOWN);
    handler.setInputAction(this.onMouseMove, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    handler.setInputAction(this.onLeftUp, Cesium.ScreenSpaceEventType.LEFT_UP);


    document.addEventListener(
        "keydown",
        function (e) {
          const flagName = getFlagForKeyCode(e.keyCode);
          if (typeof flagName !== "undefined") {
            flags[flagName] = true;
          }
        },
        false
    );


    document.addEventListener(
        "keyup",
        function (e) {
          const flagName = getFlagForKeyCode(e.keyCode);
          if (typeof flagName !== "undefined") {
            flags[flagName] = false;
          }
        },
        false
    );


    viewer.clock.onTick.addEventListener(function (clock) {
      const camera = viewer.camera;

      if (flags.looking) {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        const x = (mousePosition.x - startMousePosition.x) / width;
        const y = -(mousePosition.y - startMousePosition.y) / height;

        const lookFactor = 0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
      }

      // Change movement speed based on the distance of the camera to the surface of the ellipsoid.
      const cameraHeight = ellipsoid.cartesianToCartographic(
          camera.position
      ).height;
      const moveRate = cameraHeight / 100.0;

      if (flags.moveForward) {
        camera.moveForward(moveRate);
      }
      if (flags.moveBackward) {
        camera.moveBackward(moveRate);
      }
      if (flags.moveUp) {
        camera.moveUp(moveRate);
      }
      if (flags.moveDown) {
        camera.moveDown(moveRate);
      }
      if (flags.moveLeft) {
        camera.moveLeft(moveRate);
      }
      if (flags.moveRight) {
        camera.moveRight(moveRate);
      }
    });
  }
}
</script>

<template>
  <el-card class="box-card">
    <tr>
      <td>Click on the Cesium display to start.</td>
    </tr>
    <tr>
      <td>w/s - move forward/backward</td>
    </tr>
    <tr>
      <td>a/d - move left/right</td>
    </tr>
    <tr>
      <td>q/e - move up/down</td>
    </tr>
    <tr>
      <td>
        left mouse button down plus mouse move changes the look direction
      </td>
    </tr>
  </el-card>
</template>

<style scoped>

</style>