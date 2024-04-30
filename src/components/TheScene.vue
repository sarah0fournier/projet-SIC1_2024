<script setup>
  import { ref } from 'vue';
  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/clickable.js';

  const allAssetsLoaded = ref(false);

  // Fonction pour ajouter un nouveau cube à la scène
  function addCube() {
    const scene = document.querySelector('a-scene');
    const newCube = document.createElement('a-box');
    
    const x = getRandomNumberInRange(-5, 5);
    const y = 1.5; // Garder une hauteur constante
    const z = getRandomNumberInRange(-5, 5);
    
    newCube.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouveau cube
    newCube.setAttribute('color', 'red'); // Couleur du nouveau cube
    newCube.setAttribute('width', '0.1'); // Largeur du nouveau cube
    newCube.setAttribute('height', '0.1'); // Hauteur du nouveau cube
    newCube.setAttribute('depth', '0.1'); // Profondeur du nouveau cube

    // Animation du nouveau cube
    newCube.setAttribute('animation__move', 'property: position; to: 5 1.5 0; dur: 5000; easing: linear;');
    newCube.setAttribute('animation__stay', 'property: position; to: 5 1.5 0; dur: 1; delay: 5000;');
    newCube.setAttribute('animation__disappear', 'property: scale; to: 0 0 0; dur: 10; delay: 8000; easing: linear;');

    scene.appendChild(newCube); // Ajouter le nouveau cube à la scène
  }

   // Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
   function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  // Appeler la fonction addCube toutes les 10 secondes
  setInterval(addCube, 5000); // 10000 millisecondes = 10 secondes
</script>

<template>
  <a-scene
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
  >

    <a-assets @loaded="allAssetsLoaded = true">
    </a-assets>

    <TheCameraRig />

    <!-- Cube initial -->
    <!--<a-box position="-5 1.5 -15" color="red" width="0.5" height="0.5" depth="0.5" 
      animation__move="property: position; to: 5 1.5 0; dur: 5000; easing: linear;" 
      animation__stay="property: position; to: 5 1.5 0; dur: 1; delay: 5000;" 
      animation__disappear="property: scale; to: 0 0 0; dur: 10; delay: 8000; easing: linear;">
    </a-box>-->

  </a-scene>
</template>