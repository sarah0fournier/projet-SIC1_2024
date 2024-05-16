<template>
  <a-scene
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    @block-removed="updateScore"
    @pause-game="togglePause"
    @win="affcihePopup"
    @nextPage = "nextPage"
    >

    <TheCameraRig />

    <!-- Bouton pause + Affichage score -->
    <!-- Actuellement bouton donc c'est un autre système que le passage du curseur -->
    <div id="fixed-text" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
        <p>Score : <span id="score">{{ score }}</span></p>
        <p>Level : <span id="Level">{{ levelParam }}</span></p>
        <button @click="togglePause">{{ isPaused ? 'Play' : 'Pause' }}</button>
        <!-- Ajotuer router pour faire revenire a la page TheHome-vue -->
        <button @click="goHome">GoHome</button> 
    </div>
  

    <!-- Import des GLB -->
    <a-assets @loaded="allAssetsLoaded = true">
      <!-- <a-asset-item id="Naye-glb" src="../assets/Naye_GLB.glb" ></a-asset-item> -->
      <a-asset-item id="Naye-glb" :src="'../assets/' + this.nameGDB"></a-asset-item>
    </a-assets>

    <!-- <a-gltf-model src="#Naye-glb" gltf-model="../assets/Naye_GLB.glb" position="200 -600 0"></a-gltf-model>    -->
    <a-gltf-model v-if="allAssetsLoaded"  src="#Naye-glb" :gltf-model="'../assets/' + this.nameGDB" :position="this.positionGDB"></a-gltf-model> 
  
    <!-- Ajoutez 1 boîte primitive -->
    <a-entity v-if="this.nameGDB">
      <a-box clickable v-if="this.nameGDB.includes('Naye')" id="box-1" code="1"  :isWin="isWin" :paused="isPaused" color="gray" position="0.0 0.0 0.0"></a-box>
    </a-entity>

    <!-- Popup de gagnant v-if="isWin"-->
    <!-- Remarque : Si position met position="0 1.5 -5" au lieu de position="0 1.5 -3" sa ne fonctionne plus -->
    <a-plane v-if="isWin" :isWin="isWin" color="grey" opacity="0.5" width="10" height="6" position="0 1.5 -3">
      <a-text value="Felicitiation tu m'as trouver" color="black" align="center" position="0 2.5 0"></a-text>
          
      <!-- Texte recuperer de requete API suisse tourisme -->
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['name']" color="black" align="center" position="0 2.0 0"></a-text>
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['abstract']" color="black" align="center" position="0 1.5 0"></a-text>

      <a-text :value="'Scores : ' + score" color="black" align="center" position="0 1.0 0"></a-text>

      <!-- bouton -->
      <!-- :paused="isPaused" a mettre si definit dans le if de clikable que jeu peut etre en pause aussi quand on voit info level... -->
      <!-- <a-plane clickable code="3" :paused="isPaused" color="grey" width="5" height="1" align="center" position="0 -1 0" > -->
      <a-plane clickable code="3" :paused="isPaused" color="grey" width="5" height="1" align="center" position="0 -1 0" >
        <a-text :value="'Prochain level :' + this.levelNext" color="black" position="0 0 0"  align="center"></a-text>
      </a-plane>
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
    // Ajouter un cube si pas encore gagner et si jeu pas en pause
    if (isWin.value === false & isPaused.value === false) {
      console.log('Le cube a ete ajouter : ', intervalCounter)
      const scene = document.querySelector('a-scene');
      const newCube = document.createElement('a-box');

      const x = getRandomNumberInRange(-10, 10);
      const y = getRandomNumberInRange(-6, 3); // Garder une hauteur constante
      const z = getRandomNumberInRange(-10, 10);

      newCube.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouveau cube
      newCube.setAttribute('color', 'red'); // Couleur du nouveau cube
      newCube.setAttribute('width', '0.1'); // Largeur du nouveau cube
      newCube.setAttribute('height', '0.1'); // Hauteur du nouveau cube
      newCube.setAttribute('depth', '0.1'); // Profondeur du nouveau cube

      // Animation du nouveau cube
      newCube.setAttribute('animation__move', 'property: position; to: 0 1.3 0; dur: 5000; easing: linear;');
      newCube.setAttribute('animation__disappear', 'property: scale; to: 0 0 0; dur: 1; delay: 5000; easing: linear;');
      newCube.setAttribute('clickable', '')
      newCube.setAttribute('code', '2')
      newCube.setAttribute('paused', 'false')
      newCube.setAttribute('id', "box-" + intervalCounter) // Id du cube
      
      scene.appendChild(newCube); // Ajouter le nouveau cube à la scène
      intervalCounter ++;
     }
    }

  // Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
  function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  let intervalCounter = 100; // Commencer intervalle numerotation a 100
  let intervalId; // Variable pour stocker l'ID de l'intervalle
  // Appeler la fonction addCube toutes les 10 secondes
  intervalId = setInterval(addCube, 5000); // 10000 millisecondes = 10 secondes

  // Surveiller le changement de isWin (quand niveau reussi veut plus ajouter de cube donc sort ajout cube intervalle)
  watch(isWin, (newValue) => {
    if (newValue) {
      // Si isWin devient true, arrêter ajouter intervalle de cube
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
    // console.log("Etat du jeu est en pause ? ", isPaused.value)
  }

  // Affichage popup
  function affcihePopup() {
    isWin.value = true // Level reussi
  }

</script> 

<!-- script setup new synthaxe dans Vue 3 : Si met si dessous dans script setup j'ai plus accès au curseur (seulement main souris). Script setup permet pas exportemenr directement module ES -->
<script>
  // API Suisse tourisme
  import {getDynamicBoundingBox} from '../aframe/requeteAPI.js';
  import { levels } from '../aframe/parametreScene.js';


  export default {

  methods: {
    // Gérer le démarrage du jeu
    goHome() {
      this.$router.push({ name: 'Home' });
    },

    // Changer de scene (retour a TheInfoLevel.vue mais pour le niveau 2) 
    nextPage() {
      console.log("Bienvenue dans InfoLevel ", this.levelNext);
      this.$router.push({ name: 'InfoLevel', params: { level: ":" + this.levelNext} });        
    },


    async fetchAttractions() {
      try {
        // Récupérer les données '46.44124, 6.98694,46.41935, 6.95736'
        console.log(levels[this.levelIndex]['position'])
        const data = await getDynamicBoundingBox(levels[this.levelIndex]['position']);
        // Mettre à jour la valeur de la variable réactive avec les nouvelles données
        this.attractions = data;
        } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
        }
    }
  },

  data(){
    return {
      levelParam : null,
      levelNext : null,
      levelIndex : null,
      nameGDB: null,
      positionGDB:null,
      attractions:null ,

      }},
  
  mounted(){

    // Récupérer le level à partir des paramètres de l'URL
    this.levelParam = this.$route.params.level.slice(1); // eg. :2 --> garder 2
    this.levelNext =  parseInt(this.levelParam) + 1
    console.log("Nous sommes dans la scene du level : " , this.levelParam)

    // Trouver l'indice du niveau dans le tableau des niveaux
    let levelNumber = parseInt(this.levelParam);
    this.levelIndex = levels.findIndex(level => level.number === levelNumber);
    this.nameGDB = levels[this.levelIndex]['data']
    console.log("Nom de la GDB en cours : " , this.nameGDB)

    this.positionGDB = levels[this.levelIndex]['positionGDB']

    // Appeler la fonction pour récupérer les données API swissTourisme dès que le composant est monté
    this.fetchAttractions();
  }
};


</script>

<style scoped>


</style>