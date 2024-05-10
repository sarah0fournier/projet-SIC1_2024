<script setup>
  import { ref } from 'vue';
  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/clickable.js';

  const allAssetsLoaded = ref(false);

 

  


</script>

<template>
  <a-scene
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
  >


    <a-assets @loaded="allAssetsLoaded = true">
      <!-- <a-asset-item id="Villars-glb" src="../assets/Villars.glb"></a-asset-item> -->
      <a-asset-item id="Naye-glb" src="../assets/Naye_GLB.glb"></a-asset-item>
    </a-assets>

    <!-- <a-gltf-model src="#Villars-glb" gltf-model="../assets/Villars.glb" position="-23.29699 -69.54534 18.87335"></a-gltf-model>     -->
    <a-gltf-model src="#Naye-glb" gltf-model="../assets/Naye_GLB.glb" position="200 -600 0"></a-gltf-model>   
    
    <TheCameraRig />


  </a-scene>
</template>
