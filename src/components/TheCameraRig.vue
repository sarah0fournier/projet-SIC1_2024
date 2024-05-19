<!--
    =======================================================================================
    Ce composant représente les parametres de la camera
    =======================================================================================
-->

<script setup>
  import '../aframe/disable-in-vr.js';
  import '../aframe/hide-in-vr.js';
  
</script>

<template>
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >

      <a-entity
        id="head"
        look-controls="pointerLockEnabled: true"
        camera
        position="0 1.65 0"
      >
        <a-entity
          geometry="primitive: circle; radius: 0.0005;"
          material="shader: flat; color : blue; "
          cursor
          raycaster="far: 300; objects: [touch], [clickable], [touch_sound] ; showLine: false;"
          position="0 0 -0.1"
          disable-in-vr="component: raycaster; disableInAR: false;"
          hide-in-vr="hideInAR: false"
        ></a-entity>

        <a-entity
          id="dummy-hand-right"
          position="0.3 -0.4 -0.5"
        ></a-entity>

        <a-entity
          id="dummy-hand-left"
          position="-0.3 -0.4 -0.5"
        ></a-entity>
      </a-entity>

      <a-entity
        id="hand-left"
        hand-controls="hand: left"
        laser-controls="hand: left"
        raycaster="far: 15; objects: [touch] , [touch_sound] ; showLine: true; lineColor: red"
        position="0 1.5 0"
      >
      </a-entity>
      
      <a-entity
        id="hand-right"
        hand-controls="hand: right"
        laser-controls="hand: right"
        raycaster="far: 4000; objects: [clickable], [touch_sound]  ; showLine: true; lineColor: blue"
        position="0 1.5 0"
      >
      </a-entity>

  </a-entity>
</template>
