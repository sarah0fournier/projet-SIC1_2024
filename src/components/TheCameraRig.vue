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
    },
  }
</script>

<template>
  <!-- Camera assignée à la tête = suit les mouvement de la tête-->
  <a-entity
    id="camera-rig"
    movement-controls="camera: #head;"
    disable-in-vr="component: movement-controls;"
  >
    <!-- Tête à 1.65  -->
    <a-entity
      id="head"
      look-controls="pointerLockEnabled: true"
      camera
      position="0 1.65 0"
    >
      <!-- Texte qui suit mouvement de la tete  -->
    <a-text 
      v-if="typeof nameLocation !== 'undefined'"
      :value="nameLocation"
      position="0 0.65 -1" 
      align="center" 
      color="black"
      width="2"
    ></a-text>

      <!-- Entité pour gérer quand on est pas en VR  -->
      <!-- Curseur qu on voit sur ordi l'ordi par exemple  -->
      <!-- Toutes les méthodes sont assignée au rayon  -->
      <a-entity
        geometry="primitive: circle; radius: 0.0005;"
        material="shader: flat; color : blue; "
        cursor
        raycaster="far: 1000000; objects: [touch], [clickable], [ray_sound], [ray] ; showLine: false;"
        position="0 0 -0.1"
        disable-in-vr="component: raycaster; disableInAR: false;"
        hide-in-vr="hideInAR: false"
      ></a-entity>

      <!-- QQQ : Sert a quoi ??  -->
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
    <!-- Rayon rouge  -->
    <a-entity
      id="hand-left"
      hand-controls="hand: left"
      laser-controls="hand: left"
      raycaster="far: 15; objects: [touch] , [ray_sound], [ray_color]; showLine: true; lineColor: red"
      position="0 1.5 0"
    >
    </a-entity>
    
    <!-- Parametre de la main droite -->
    <!-- Rayon bleu -->
    <a-entity
      id="hand-right"
      hand-controls="hand: right"
      laser-controls="hand: right"
      raycaster="far: 1000000; objects: [clickable], [ray_sound], [ray_color]; showLine: true; lineColor: blue"
      position="0 1.5 0"
    >
    </a-entity>

  </a-entity>
</template>


