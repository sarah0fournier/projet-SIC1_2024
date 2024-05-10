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
<!-- // PBL : Score disparait si met en mode VR  -->
  <!-- // A essayer en isntallant package  'aframe-html-shader' puis donc three mais sans succes -->
<!-- // Router pas sure de faire tout juste et chaque besoin de creer des scripts scripts setup - cheni tous sa -->
<!-- Arrive pas aller a une autre scene apres level 1 -> pbl interaction sur cube next level -->