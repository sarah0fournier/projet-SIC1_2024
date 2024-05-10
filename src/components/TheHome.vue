<script setup>
    import { ref } from 'vue';
    import TheCameraRig from './TheCameraRig.vue';
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
        startGame() {
            this.gameStarted = true;
            this.$router.push({ name: 'Scene1' });
        }
    }};
</script>

<template>
    <a-scene     
        background="color: gray;"
        :webxr="`
        requiredFeatures: local-floor;
        referenceSpaceType: local-floor;
        `">

        <TheCameraRig />

        <a-entity  v-if="!gameStarted" id="cursor" cursor="rayOrigin: mouse" raycaster="objects: .clickable">
            <a-plane v-if="!gameStarted" color="white" width="10" height="6" position="0 1.5 -5">
            <!-- bouton -->
            <a-plane class="clickable" @click="startGame" color="grey" width="5" height="1" align="center" position="0 1 0" opacity="0.5">
                <a-text value="Commencer le jeu !" color="black" position="-1 0 0">
                </a-text>
            </a-plane>


            <a-text value="Bienvenue sur notre jeu !" color="black" position="-1 -1 0"></a-text>
        </a-plane>
        </a-entity>
    </a-scene>
</template>

<style>


</style>