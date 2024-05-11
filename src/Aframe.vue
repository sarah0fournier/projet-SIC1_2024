<script setup>
  import { ref } from 'vue';
  import router from './router';
  const loaded = ref(false);
</script>


<style>


</style>

<template>
    <!-- <TheOnboarding :loaded="loaded" /> -->
   <!-- <TheScene
      @loaded="loaded = true"
    /> -->

    <router-view></router-view>

</template>

<!-- TODO - PBL a regler  -->
<!-- Box continue a circuler quand on va dans autres scenes pas top - pas sure que gestion soit fait tres prorpres -->
<!-- Arrive pas aller a une autre scene apres level 1 -> pbl interaction sur cube next level -->
<!-- Score disparait si met en mode VR  -->
  <!-- -> A essayer en isntallant package  'aframe-html-shader' puis donc three mais sans succes -->
<!-- Router pas sure de faire tout juste et chaque besoin de creer des scripts scripts setup - cheni tous sa -->
<!-- Mixage entre vue et non vue avec aframe tres cheni -->


<!-- Information -->
<!-- Variable code dans TheScene pour primitive -->
<!-- Code = 1 Geometrie placer manuellement a trouver -->
<!-- Code = 2 Geometrie mis automatiquement (cube) -->
<!-- Code = 3 Geometrie pour passer au next level -->

<!-- TheInfoLevel.vue -->
<!-- Vue pour passer a une autre scene : apres chaque scene on affiche InfoLevel qui dit le prochain element a chercher -->

