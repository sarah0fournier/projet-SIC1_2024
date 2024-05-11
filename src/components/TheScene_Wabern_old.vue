<template>
  <a-scene
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    @block-removed="updateScore"
    :paused="isPaused"
    @pause-game="togglePause"
    @win="affcihePopup"
    @nextLevel = 'changerScene'
    >

    <TheCameraRig />

    <!-- Bouton pause + Affichage score -->
    <div id="fixed-text" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
        <p>Score : <span id="score">{{ score }}</span></p>
        <p>Niveau : <span id="Niveau">{{ niveau }}</span></p>
        <button @click="togglePause">{{ isPaused ? 'Play' : 'Pause' }}</button>
        <!-- Ajotuer router pour faire revenire a la page TheHome-vue -->
        <button @click="goHome">GoHome</button> 
    </div>
  


    <!-- Eg. import obj : https://aframe.io/docs/master/components/obj-model.html#sidebar -->
    <a-assets @loaded="allAssetsLoaded = true">
      <!-- <a-asset-item id="Villars-glb" src="../assets/Villars.glb"></a-asset-item> -->
      <a-asset-item id="Naye-glb" src="../assets/Naye_GLB.glb"></a-asset-item>
    </a-assets>

    <!-- <a-gltf-model src="#Villars-glb" gltf-model="../assets/Villars.glb" position="-23.29699 -69.54534 18.87335"></a-gltf-model>     -->
    <a-gltf-model src="#Naye-glb" gltf-model="../assets/Naye_GLB.glb" position="200 -600 0"></a-gltf-model>   
    
    
    <!-- Ajoutez 1 boîte primitive -->
    <a-box clickable manuallyPlaced="true" :isWin="isWin"  :paused="isPaused" color="gray"></a-box>


    <!-- Popup de gagnant -->
    <a-plane v-if="isWin" color="grey" width="10" height="6" position="0 1.5 -5" opacity="0.5">
      <!-- Vous pouvez ajouter du texte, des boutons ou d'autres éléments ici -->
      <a-text value="Felicitiation tu m'as trouver" color="black" align="center" position="0 1.5 0"></a-text>
      
      <!-- bouton -->
      <a-box clickable :isWin="isWin" color="white" width="5" height="1" position="0 1 0" opacity="0.5">
        <a-text value="Prochain level !" color="black" position="-1 0 0"></a-text>
        <!-- <router-link :to="{ name: 'Scene2' }">    </router-link> -->
      </a-box> 
    </a-plane>


  </a-scene>
</template>
  

<script setup>
  import { ref, watch } from 'vue';
  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/clickable.js';
  // import * as THREE from 'three';
  // import 'aframe-html-shader'; //  Package pour créer une surface sur laquelle afficher notre contenu HTML.


  const allAssetsLoaded = ref(false);
  const isPaused = ref(false); // Gestions pause du jeu
  const isWin = ref(false); // Bloc a ete trouver 

  // Fonction pour ajouter un nouveau cube à la scène
  function addCube() {   
    console.log('Ajout cube ', isWin.value)  
     if (isWin.value === false) {
      console.log('le cube est ajouter')
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
      newCube.setAttribute('animation__move', 'property: position; to: -0.01 1.5 1.2; dur: 5000; easing: linear;');
      newCube.setAttribute('animation__stay', 'property: position; to: -0.01 1.5 1.2; dur: 1; delay: 5000;');
      newCube.setAttribute('animation__disappear', 'property: scale; to: 0 0 0; dur: 10; delay: 8000; easing: linear;');
      newCube.setAttribute('clickable', '')
      newCube.setAttribute('manuallyPlaced', 'false')
      newCube.setAttribute('paused', 'false')
      
  
      scene.appendChild(newCube); // Ajouter le nouveau cube à la scène
     }
    }

  // Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
  function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  let intervalId; // Variable pour stocker l'ID de l'intervalle
  // Appeler la fonction addCube toutes les 10 secondes
  intervalId = setInterval(addCube, 5000); // 10000 millisecondes = 10 secondes

  // Surveiller le changement de isWin (quand niveau reussi veut plus ajouter de cube donc sort ajout cube intervalle)
  watch(isWin, (newValue) => {
    if (newValue) {
      // Si isWin devient true, arrêter l'intervalle
      clearInterval(intervalId);
    }
  });

  // Gestions score
  const score = ref(0);
  function updateScore(){
      score.value += 1;
  };


  // Changer etat du bouton pause
  function togglePause() {
    isPaused.value = !isPaused.value;
    // console.log(isPaused.value)
  }

  // Affichage popup
  function affcihePopup() {
    isWin.value = true // Level reussi
    isPaused.value = true
  }

  // const isNextScene = ref(false);
  // function changerScene(){ // Changer de scene quand passer curseur sur bouton
  //   isNextScene.value = true
  //   // Écouter l'événement personnalisé 'navigate-to-scene2' émis par le composant clickable
  //   document.querySelector('a-scene').addEventListener('nextLevel', function () {
  //     this.$router.push({ name: 'Scene2' });
  //   });
  // }

  const niveau = ref(1);

</script>

<!-- script setup new synthaxe dans Vue 3 : Si met si dessous dans script setup j'ai plus accès au curseur (seulement main souris). Script setup permet pas exportemenr directement module ES -->
<script>
    export default {
        setup() {
            return {
                score,
                updateScore,
                niveau,
                isPaused,
                endLevel,
                isWin,
            };
        },
        methods: {
       // Gérer le démarrage du jeu
        goHome() {
            this.$router.push({ name: 'Home' });
        },

    }};

    import { onMounted } from 'vue';

</script>

<style scoped>



</style>
  
