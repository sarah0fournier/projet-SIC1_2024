<!--
    =======================================================================================
    Ce composant représente les parametres de la camera
    =======================================================================================
-->

<script setup>
  import '../aframe/disable-in-vr.js';
  import '../aframe/hide-in-vr.js';
</script>

<script>
  export default {
    name: 'TheCameraRig',

    props: {
      nameLocation : { 
        required : false,
        type: String, 
      },
      score : { 
        required : false,
      },
      level : { 
        required : false,
      }
    },
    watch:{
      nameLocation(newValue){
        // console.log('TheCameraRig mounted with location:', newValue);
      },
      score(newValue){
        // console.log('TheCameraRig mounted with score:', newValue);
      },
      level(newValue){
        // console.log('TheCameraRig mounted with level:', newValue);
      }
    },

    mounted(){
      // console.log('TheCameraRig mounted location :', this.nameLocation );
      // console.log('TheCameraRig mounted score :', this.score );
      // console.log('TheCameraRig mounted level :', this.level );
    }
  }
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
      <!-- Texte qui suit mouvement de la tete  -->
      <a-text 
        :value="nameLocation"
        position="0 0.1 -0.15" 
        align="center" 
        color="white"
        width="0.3"
      ></a-text>

      <a-text 
        v-if="typeof score !== 'undefined'" 
          :value="'Score : ' + score"
          position="0.2 0.1 -0.15" 
          color="white"
          width="0.15"
      ></a-text>

      <a-text 
        v-if="typeof level !== 'undefined'"
          :value="'Level : ' + level"
          position="0.2 0.085 -0.15" 
          color="white"
          width="0.15"
      ></a-text>

      <!-- Curseur qu on voit sur ordi ??????????  -->
      <a-entity
        geometry="primitive: circle; radius: 0.0005;"
        material="shader: flat; color : blue; "
        cursor
        raycaster="far: 300; objects: [touch], [clickable], [touch_sound] ; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <!-- Sert a quoi ?  -->
      <a-entity
        id="dummy-hand-right"
        position="0.3 -0.4 -0.5"
      ></a-entity>

      <a-entity
        id="dummy-hand-left"
        position="-0.3 -0.4 -0.5"
      ></a-entity>
    </a-entity>

    <!-- Parametre de la main gauche -->
    <!-- far : distance maximale qui peut etre detecter par rayon [unites] -->
    <a-entity
      id="hand-left"
      hand-controls="hand: left"
      laser-controls="hand: left"
      raycaster="far: 15; objects: [killable], [touch] , [touch_sound] ; showLine: true; lineColor: red"
      position="0 1.5 0"
    >
    </a-entity>
    
    <!-- Parametre de la main droite -->
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


