<!--
    =======================================================================================
    Ce composant représente les scenes des levels
    =======================================================================================
-->

<template>
  <a-scene
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    @block-removed="updateScore(1)"
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
        <!-- Ajouter router pour faire revenir a la page TheHome-vue -->
        <button @click="goHome">GoHome</button> 
    </div>
  

    <!-- Import des GLB -->
    <a-assets @loaded="allAssetsLoaded = true">
      <!-- <a-asset-item id="Naye-glb" src="../assets/Naye_GLB.glb" ></a-asset-item> -->
      <a-asset-item id="Naye-glb" :src="'../assets/' + this.nameGDB"></a-asset-item>
      <a-asset-item id="Ghost-glb" src="../assets/Ghost.glb"></a-asset-item>
      <a-asset-item id="HotBalloon-glb" src="../assets/HotBalloon.glb"></a-asset-item>
      <a-asset-item id="Fire-glb" src="../assets/Fire.glb"></a-asset-item>
      <a-asset-item id="Cat-glb" src="../assets/Cat.glb"></a-asset-item>

      <!-- Son global -->
      <a-sound id="clickable-sound" src="../assets/clickable.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
      <a-sound id="touch-sound" src="../assets/touch.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
      <a-sound id="fin-sound" src="../assets/fin.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
    </a-assets>


    <!-- Initialisation des GLB décoratives -->
    <a-gltf-model v-if="allAssetsLoaded" src="#HotBalloon-glb" gltf-model="../assets/HotBalloon.glb" position="0 -0.8 0" scale="0.5 0.7 0.5"></a-gltf-model>
    
    <a-gltf-model v-if="allAssetsLoaded" touch_sound code ='5'src="#Fire-glb" animation-mixer position="0 3.1 0" gltf-model="../assets/Fire.glb" 
      scale="0.25 0.25 0.25"
      sound="src: ../assets/Fire.mp3; autoplay:false"
    ></a-gltf-model>

    <a-gltf-model v-if="allAssetsLoaded" touch_sound code ='5' src="#Cat-glb" animation-mixer=""  gltf-model="../assets/Cat.glb" 
      position="0.28564 -0.11067 -0.26652" scale="0.02 0.02 0.02" rotation="0 -150 0" 
      sound="src: ../assets/Cat.mp3; autoplay:false "
    ></a-gltf-model>

    <!-- Initialisation des GLB de paysages -->
    <a-gltf-model v-if="allAssetsLoaded"  src="#Naye-glb" :gltf-model="'../assets/' + this.nameGDB" :position="this.positionGDB"></a-gltf-model> 
  
    <!-- Ciel (echelle à adapté en fonction taille des tuiles) -->
    <a-sky :src="'../assets/' + this.nameSky" :scale="this.scaleSky"></a-sky>

    <!-- Ajoutez 1 hit box à trouver-->
    <a-entity v-if="this.nameGDB">
      <a-plane  clickable v-if="this.nameGDB.includes('Naye')" id="plane-1" code="1"  :isWin="isWin" :paused="isPaused" 
        color="gray" rotation="0 -140 0" position="132.8 -134.1 121.7" width="40" height="20" visible="false" 
      ></a-plane>
    </a-entity>


    <!-- Point que les ennemis devront viser -> orientation (ne concerne pas les déplacements) -->
    <a-entity id="POI" position="0 1.5 0" visible="false"></a-entity>
    

    <!-- Popup de gagnant -->
    <a-plane v-if="isWin" :isWin="isWin" color="grey" opacity="0.5" width="3" height="2" :position="this.positionPopup">
      <a-text value="Felicitiation tu m'as trouve" color="black" align="center" position="0 0.75 0" scale="0.5 0.5 0.5"></a-text>
          
      <!-- Texte recuperé de requete API suisse tourisme -->
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['name']" color="black" align="center" position="0 -0.25 0" scale="0.5 0.5 0.5"></a-text>
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['abstract']" color="black" align="center" position="0 -0.5 0" scale="0.5 0.5 0.5"></a-text>

      <a-text :value="'Scores : ' + score" color="black" align="center" position="0 0.0 0" scale="0.5 0.5 0.5"></a-text>

      <!-- Bouton  passage au prochaine level-->
      <!-- :paused="isPaused" a mettre si definit dans le if de clikable que jeu peut etre en pause aussi quand on voit info level... -->
      <a-plane clickable code="3" :paused="isPaused" color="grey" width="2" height="0.25" align="center" position="0 -1 0.1">
        <a-text :value="'Prochain level :' + this.levelNext" color="black" position="0 0 0"  align="center" scale="0.5 0.5 0.5"></a-text>
      </a-plane>
    </a-plane>


  </a-scene>
</template>
  

<script setup>
  import { ref, watch } from 'vue';
  import TheCameraRig from './TheCameraRig.vue';
  import '../aframe/clickable.js';
  import '../aframe/touch_sound.js';
  import '../aframe/touch.js';
  import {addFoe, getRandomNumberInRange} from '../aframe/foe.js'; // Interaction fantome


  // Constantes globales de l'état du jeu
  const allAssetsLoaded = ref(false);
  const isPaused = ref(false); // Mise en pause
  const isWin = ref(false); // Hit-box trouvée 
  const score = ref(0);   // Gestions score


  // ?????????????????? Si utilise updateScoreFoe au lieu de updateScore dans la partie scene tout en haut sa pause pbl error comprend pas pk doit avoir un cheni entre les scores avec ces variables
  // Score est independant des scenes --> idealement faudrait essayer de les ajouter dans un dictionaire de stockage de resultat
  function updateScore(pt){
      score.value += pt;
  };

  // Variables pour les fantomes
  let intervalCounter = ref(100); // Commencer intervalle numerotation a 100
  let intervalId; // Variable pour stocker l'ID de l'intervalle
  
  // Appeler la fonction addFoe toutes les x secondes
  let intervalTime = getRandomNumberInRange(4000, 8000)
  intervalId = setInterval(() => {
    addFoe(isWin, isPaused, intervalCounter, score); // Appel de la fonction pour ajouter un fantome
  }, intervalTime);

  // Surveiller le changement de isWin (quand niveau reussi veut plus ajouter de cube donc sort ajout cube intervalle)
  watch(isWin, (newValue) => {
    if (newValue) {
      // Si isWin devient true, arrêter ajouter intervalle de fantome
      clearInterval(intervalId);
    }
  });

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
  import {fetchDataAttraction} from '../aframe/requeteAPI.js'; 
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

      // Faire la requete a swissTourisme en fonction du level en cours
      async fetchAttractions() {
        try {
          // console.log("Boudingbox en cours : " , levels[this.levelIndex]['position'])
          const data = await fetchDataAttraction(levels[this.levelIndex]['position']);
          // Mettre à jour la valeur de la variable réactive avec les nouvelles données
          this.attractions = data;
          } catch (error) {
          console.error('Erreur lors de la récupération des données :', error);
          }
      }
    },

    data(){
      return {
        levelParam: null,
        levelNext: null,
        levelIndex: null,
        nameGDB: null,
        positionGDB: null,
        attractions: null,
        scaleSky: null,
        positionPopup: null,
        nameSky: null,
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
    this.scaleSky = levels[this.levelIndex]['scaleSky']
    this.nameSky = levels[this.levelIndex]['nameSky']
    this.positionPopup = levels[this.levelIndex]['positionPopup']
    
    // Appeler la fonction pour récupérer les données API swissTourisme dès que le composant est monté
    this.fetchAttractions();
  }
};


</script>

<style scoped>

</style>