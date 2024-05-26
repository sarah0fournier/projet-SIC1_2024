<!--
    =======================================================================================
    Ce composant représente la page de depart ou l utilisateur peut commencer a lancer le jeu
    =======================================================================================
-->

<script setup>
    // import { ref } from 'vue'; // QQQ : Inutile, peut delete (lie au ref ci dessous) ??
    // import TheCameraRig from './TheCameraRig.vue'; // QQQ : Deplacer dans script vue 2
    // import '../aframe/clickable.js'; // QQQ : Deplacer dans script vue 2
    // import '../aframe/ray_color.js'; // QQQ : Deplacer dans script vue 2
    // import '../aframe/ray_sound.js'; // QQQ : Deplacer dans script vue 2
    // import '../aframe/touch.js'; // QQQ : Deplacer dans script vue 2

    // Indique si la scène est chargée
    // const loaded = ref(false); // QQQ : Inutile, peut delete ??
    

</script>

<script>
    import TheCameraRig from './TheCameraRig.vue';
    import '../aframe/clickable.js'; // QQQ : Son du clique gerer dans clickable.js ?
    import '../aframe/ray_color.js';
    import '../aframe/ray_sound.js'; // QQQ : Pk importer pas utiliser ci dessous ?
    import '../aframe/touch.js'; // QQQ : Pk importer pas utiliser ci dessous ?

    export default {
        data() {
            return {
            gameStarted: false,
            isPaused: false,
        }},
        methods: {
            // Gérer le démarrage du jeu
            nextPage() {
                this.gameStarted = true;
                this.$router.push({ name: 'InfoLevel', params: { level: ":1" } });           
            },

    }};
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
        <!-- QQQ : Param requiredFeatures et referenceSpaceType ? -->
        
        <TheCameraRig />
        
        <!-- Plan pour afficher les informations de bienvenue et le bouton de démarrage du jeu -->
        <a-plane color="white"  width="10" height="6" position="0 1.5 -5">
            <a-text value="Bienvenue a la decouverte de la Suisse !" scale="1.5 1.5 1.5" align="center" color="black" position="0 2 0"></a-text>
            <a-text value="But du jeu : Trouver l'emplacement de la location mentionner"  color="black" align="center" position="0 0.5 0"></a-text>

            <!-- Bouton de démarrage du jeu -->
            <a-plane clickable ray_color :paused="isPaused" code="3" color="grey" width="5" height="1" align="center" position="0 -1 0.1" opacity="0.5">
                <a-text value="Commencer le jeu !" color="black" position="-1 0 0"></a-text>
            </a-plane>
        </a-plane>

    </a-scene>
</template>
