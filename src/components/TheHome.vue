<script setup>
    import { ref } from 'vue';
    import TheCameraRig from './TheCameraRig.vue';
    import '../aframe/clickable.js';
    import '../aframe/touch.js';
    // import '../aframe/touchSound.js';

    const loaded = ref(false);
</script>

<script>
    export default {
        data() {
            return {
            gameStarted: false
        }},
    methods: {
        // Gérer le démarrage du jeu
        nextPage() {
            this.gameStarted = true;
            this.$router.push({ name: 'InfoLevel', params: { level: ":1" } });           
        }
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

    <TheCameraRig />
    
        <a-plane color="white"  width="10" height="6" position="0 1.5 -5">
            <a-text value="Bienvenue a la decouverte de la Suisse !" scale="1.5 1.5 1.5" align="center" color="black" position="0 2 0"></a-text>
            <a-text value="But du jeu : Trouver l'emplacement de la location mentionner"  color="black" align="center" position="0 0.5 0"></a-text>

            <!-- bouton -->
            <a-plane clickable code="3" color="grey" width="5" height="1" align="center" position="0 -1 0" opacity="0.5">
                <a-text value="Commencer le jeu !" color="black" position="-1 0 0">
                </a-text>
            </a-plane>
        </a-plane>
    </a-scene>
</template>

<style>


</style>