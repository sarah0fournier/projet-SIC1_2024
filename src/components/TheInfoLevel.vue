<!-- Level 1 -->

<script setup>
    import { ref } from 'vue';
    import TheCameraRig from './TheCameraRig.vue';
    const loaded = ref(false);
</script>

<script>
    import { levels } from '../aframe/parametreScene.js';

    export default {
        data() {
            return {
            gameStarted: false,
            currentLevel: 0, // Indice du niveau actuel dans le tableau
        }},
    methods: {
        nextPage() {
            // Aller a la scene du level
            if(this.gameStarted){
                console.log("Bienvenue sur " + levels[this.currentLevel].name + " Level : " + levels[this.currentLevel].number);
                let level = levels[this.currentLevel].number
                this.$router.push({ name: 'Scene', params: { level: ":" + level } });           
            }
            // Aller a la page home
            else{
                console.log('Fin du jeux')
                this.$router.push({ name: 'Home'});          
            }
        }
    },
    
    mounted() {
        // Récupérer le level à partir des paramètres de l'URL
        let levelParam = this.$route.params.level.slice(1); // eg. :2 --> garder 2

        // Trouver l'indice du niveau dans le tableau des niveaux
        let levelNumber = parseInt(levelParam);
        let levelIndex = levels.findIndex(level => level.number === levelNumber);


        if (levelIndex !== -1) {
            this.currentLevel = levelIndex;
            // Démarrer le jeu une fois que le niveau a été initialisé
            this.gameStarted = true;
        }
        else{
            this.currentLevel = levelParam;
            // Index ne se trouve pas dans la liste des scenes levels
            this.gameStarted = false;
        } 
    },
  };
</script>

<template>
    <a-scene     
        background="color: gray;"
        :webxr="`
        requiredFeatures: local-floor;
        referenceSpaceType: local-floor;
        `"
        @nextPage = "nextPage"
        >

        <TheCameraRig />

        <!-- Popup du prochain level -->
        <a-plane v-if="gameStarted" color="white"  width="10" height="6" position="0 1.5 -5">
            <a-text :value="'Level ' + (currentLevel + 1).toString()" color="black" position="0 2 0" align='center' scale="1.5 1.5 1.5"></a-text>
            <a-text :value="'Emplacement a rechercher : ' + levels[currentLevel].name" color="black" position="0 1 0"align='center'></a-text>

            <!-- bouton -->
            <a-plane clickable code="3" color="grey" width="5" height="1" align="center" position="0 -1 0" opacity="0.5">
                <a-text value="C'est parti !" color="black" position="0 0 0" align='center'></a-text>
            </a-plane>
        </a-plane>

        <!-- Popup du prochain level -->
        <a-plane v-if="!gameStarted" color="white"  width="10" height="6" position="0 1.5 -14">
            <a-text value="Bravo vous a terminer les levels" color="black" position="0 2 0" align='center' scale="1.5 1.5 1.5"></a-text>
            <!-- bouton -->
            <a-plane clickable code="3" color="grey" width="5" height="1" align="center" position="0 -1 0" opacity="0.5">
                <a-text value="Retour a la page home !" color="black" position="0 0 0" align='center'></a-text>
            </a-plane>
        </a-plane>

    </a-scene>
</template>

<style>


</style>