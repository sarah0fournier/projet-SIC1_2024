<!--
    =======================================================================================
    Ce composant représente les scenes des niveaux
    =======================================================================================
-->

<template>
  <a-scene
    background="color: gray;"
    :webxr="`
      requiredFeatures: local-floor;
      referenceSpaceType: local-floor;
    `"
    @block-removed="updateScorePlus(1)"
    @pause-game="togglePause"
    @win="affcihePopup"
    @nextPage = "nextPage"
    >

    <TheCameraRig :nameLocation=this.nameLocation :score=score :level=levelParam />

    <!-- Bouton pause + Affichage score -->
    <!-- Actuellement bouton donc c'est un autre système que le passage du curseur ? Vraiment ????? -->
    <div id="fixed-text" style="position: fixed; top: 20px; right: 20px; z-index: 9999;">
        <!-- A delete socre et level si on met dans lunette ??? -->
          <!-- <p>Score : <span id="score">{{ score }}</span></p> -->
          <!-- <p>Level : <span id="Level">{{ levelParam }}</span></p> -->
        <button @click="togglePause">{{ isPaused ? 'Play' : 'Pause' }}</button>
        <!-- Ajouter router pour faire revenir a la page TheHome-vue -->
        <button @click="goHome">GoHome</button> 
    </div>
  
    <!-- Import GLB -->
    <a-assets @loaded="allAssetsLoaded = true">
      <a-asset-item id="Lieu-glb" :src="'../assets/' + this.nameGDB"></a-asset-item>
      <a-asset-item id="Ghost-glb" src="../assets/Ghost.glb"></a-asset-item>
      <a-asset-item id="HotBalloon-glb" src="../assets/HotBalloon.glb"></a-asset-item>
      <a-asset-item id="Fire-glb" src="../assets/Fire.glb"></a-asset-item>
      <a-asset-item id="Cat-glb" src="../assets/Cat.glb"></a-asset-item>

      <!-- Son global -->
      <!-- param poolSize : nbr de copie du son charge en memeoie (utile si son jouer plusieurs fois, permet de réduire delai chargement son) -->
      <a-sound id="clickable-sound" src="../assets/clickable.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
      <a-sound id="touch-sound" src="../assets/touch.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
      <a-sound id="fin-sound" src="../assets/fin.mp3" autoplay="false" volume="1.0" poolSize="10"></a-sound>
    </a-assets>


    <!-- Initialisation des GLB décoratives -->
    <a-gltf-model v-if="allAssetsLoaded" src="#HotBalloon-glb" gltf-model="../assets/HotBalloon.glb" position="0 -0.8 0" scale="0.5 0.7 0.5"></a-gltf-model>
    
    <!-- param : animation-mixer permet de voire le chat bouger  -->
    <a-gltf-model v-if="allAssetsLoaded" touch_sound code ='5'src="#Fire-glb" animation-mixer position="0 3.1 0" gltf-model="../assets/Fire.glb" 
      scale="0.25 0.25 0.25"
      sound="src: ../assets/Fire.mp3; autoplay:false"
    ></a-gltf-model>

    <a-gltf-model v-if="allAssetsLoaded" touch_sound code ='5' src="#Cat-glb" animation-mixer  gltf-model="../assets/Cat.glb" 
      position="0.28564 -0.11067 -0.26652" scale="0.02 0.02 0.02" rotation="0 -150 0" 
      sound="src: ../assets/Cat.mp3; autoplay:false "
    ></a-gltf-model>

    <!-- Initialisation des GLB de paysages -->
    <a-gltf-model v-if="allAssetsLoaded"  src="#Lieu-glb" :gltf-model="'../assets/' + this.nameGDB" :position="this.positionGDB"></a-gltf-model> 
  
    <!-- Ciel (echelle à adapté en fonction taille des tuiles) -->
    <a-sky :src="'../assets/' + this.nameSky" :scale="this.scaleSky"></a-sky>

    <!-- Ajoutez 1 hit box à trouver-->
    <a-entity v-if="this.nameGDB">
      <a-plane  clickable v-if="this.nameGDB.includes('Naye')" id="plane-1" code="1"  :isWin="isWin" :paused="isPaused" 
        color="gray" rotation="0 -140 0" position="132.8 -134.1 121.7" width="40" height="20" visible="false" 
      ></a-plane>

      <a-plane  clickable v-if="this.nameGDB.includes('Pilatus')" id="plane-1" code="1"  :isWin="isWin" :paused="isPaused" 
        color="gray" rotation="0 -140 0" position="132.8 -134.1 121" width="40" height="20" visible="true" 
      ></a-plane>
      <!-- A completer si autre level de hit box -->
    </a-entity>

    <!-- Point que les ennemis devront viser -> orientation (ne concerne pas les déplacements) -->
    <a-entity id="POI" position="0 1.5 0" visible="false"></a-entity>
    

    <!-- Popup de gagnant -->
    <a-plane v-if="isWin" :isWin="isWin" color="grey" opacity="0.5" width="3" height="2.5" :position="this.positionPopup">
      <a-text value="Felicitiation tu m'as trouve" color="black" align="center" position="0 0.75 0" scale="0.5 0.5 0.5"></a-text>

      <a-text :value="'Scores : ' + score" color="black" align="center" position="0 0.5 0" scale="0.5 0.5 0.5"></a-text>

      <!-- Recuperé de requete API suisse tourisme -->
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['name']" color="black" align="center" position="0 0.25 0" scale="0.5 0.5 0.5"></a-text>
      <a-text v-if="this.attractions[0]['name']" :value="this.attractions[0]['abstract']" color="black" align="center" position="0 -0.25 0" scale="0.5 0.5 0.5"></a-text>


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
  import {addFoe, getRandomNumberInRange} from '../aframe/foe.js';

  // Constantes globales de l'état du jeu
  const allAssetsLoaded = ref(false);
  const isPaused = ref(false); // Mise en pause
  const isWin = ref(false); // Hit-box trouvée 
  const score = ref(0);   // Gestions score

  function updateScorePlus(pt){
      score.value += pt;
  };

  function togglePause() {
    isPaused.value = !isPaused.value;
    // console.log("Etat du jeu est en pause ? ", isPaused.value)
  }

  function affcihePopup() {
    isWin.value = true // Level reussi
  }

  // Variables pour les fantomes
  let intervalCounter = ref(100);
  let intervalId; 
  
  // Appeler addFoe() toutes les x secondes
  let intervalTime = getRandomNumberInRange(4000, 8000)
  intervalId = setInterval(() => {
    addFoe(isWin, isPaused, intervalCounter, score);
  }, intervalTime);

  watch(isWin, (newValue) => {
    if (newValue) {
      // Si isWin = true -> arrêter ajouter intervalle de fantome
      clearInterval(intervalId);
    }
  });

</script> 

<script>
  import {fetchDataAttraction} from '../aframe/requeteAPI.js'; 
  import { levels } from '../aframe/parametreScene.js';

  export default {
    components: {
      TheCameraRig
    },

    methods: {
      // Gérer le démarrage du jeu
      goHome() {
        this.$router.push({ name: 'Home' });
      },

      // Changer de scene (retour a TheInfoLevel.vue mais pour le niveau 2) 
      nextPage() {
        // console.log("Bienvenue dans InfoLevel ", this.levelNext);
        this.$router.push({ name: 'InfoLevel', params: { level: ":" + this.levelNext} });        
      },

      // Requete a swissTourisme en fonction du level en cours
      async fetchAttractions() {
        try {
          // console.log("Boudingbox en cours : " , levels[this.levelIndex]['position'])
          const data = await fetchDataAttraction(levels[this.levelIndex]['position']);
          // Mettre à jour la valeur de la variable avec les nouvelles données
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
        nameLocation:null,
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
      // console.log("Nous sommes dans la scene du level : " , this.levelParam)

      // Trouver l'indice du niveau dans le tableau des niveaux
      let levelNumber = parseInt(this.levelParam);
      this.levelIndex = levels.findIndex(level => level.number === levelNumber);

      this.nameGDB = levels[this.levelIndex]['data']
      // console.log("Nom de la GDB en cours : " , this.nameGDB)
      this.nameLocation = levels[this.levelIndex]['name']
      this.positionGDB = levels[this.levelIndex]['positionGDB']
      this.scaleSky = levels[this.levelIndex]['scaleSky']
      this.nameSky = levels[this.levelIndex]['nameSky']
      this.positionPopup = levels[this.levelIndex]['positionPopup']
      
      this.fetchAttractions();
    }
  };
</script>

