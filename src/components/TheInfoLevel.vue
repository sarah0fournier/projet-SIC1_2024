<!-- Level 1 -->

<script setup>
    import { ref } from 'vue';
    import TheCameraRig from './TheCameraRig.vue';
    const loaded = ref(false);
</script>

<script>
    export default {
        data() {
            return {
            gameStarted: false,
            currentLevel: 0, // Indice du niveau actuel dans le tableau
                levels: [ // Tableau des niveaux avec leurs noms associés
                    { name: "Rocher de Naye (VD)", number: 1, position:'46.44124, 6.98694,46.41935, 6.95736' },
                    { name: "Autre lieu du niveau a definir", number: 2 },
                    // Ajoutez d'autres level au besoin
                ]
        }},
    methods: {
        // Gérer le démarrage du jeu
        startGame() {
            this.gameStarted = true;
            console.log("Bienvenue sur " + this.levels[this.currentLevel].name);
            let level = this.levels[this.currentLevel].number
            console.log(level)
            this.$router.push({ name: 'Scene' + level });
        }
    },
    
    mounted() {
        // Récupérer le level à partir des paramètres de l'URL
        let levelParam = this.$route.params.level.slice(1); // eg. :2 --> garder 2

        // Trouver l'indice du niveau dans le tableau des niveaux
        let levelIndex = levelParam - 1; // -1 car indice commence a 0 une liste
        if (levelIndex !== -1) {
            this.currentLevel = levelIndex;
            // Démarrer le jeu une fois que le niveau a été initialisé
            this.gameStarted = true;
        } },
  };
</script>

<template>
    <a-scene     
        background="color: gray;"
        :webxr="`
        requiredFeatures: local-floor;
        referenceSpaceType: local-floor;
        `">

        <TheCameraRig />

        <a-entity  v-if="gameStarted" id="cursor" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
            <a-plane v-if="gameStarted" color="white" width="10" height="6" position="0 1.5 -5">
                <a-text :value="$route.params.level"></a-text>
                <a-text :value="'Level ' + (currentLevel + 1).toString()" color="black" position="0 2 0" align='center' scale="1.5 1.5 1.5"></a-text>
                <a-text :value="'Emplacement a rechercher : ' + levels[currentLevel].name" color="black" position="0 1 0"align='center'></a-text>

                <a-plane class="clickable" @click="startGame" color="grey" width="5" height="1" align="center" position="0 0 0" opacity="0.5">
                    <a-text value="C'est parti !" color="black" position="0 0 0" align='center'></a-text>
                </a-plane>
            </a-plane>
        </a-entity>


    </a-scene>
</template>

<style>


</style>