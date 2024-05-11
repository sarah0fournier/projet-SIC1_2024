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

<!-- DEBUT TODO - PBL a regler  -->

<!-- Animation / Navigation scene -->
<!-- Box continue a circuler quand on va dans autres scenes pas top - pas sure que gestion soit fait tres prorpres -->
<!-- Arrive pas aller a une autre scene apres level 1 -> pbl interaction sur cube next level -->
<!-- Score disparait si met en mode VR  -->
  <!-- -> A essayer en isntallant package  'aframe-html-shader' puis donc three mais sans succes -->

<!-- General -->
<!-- Router pas sure de faire tout juste et chaque besoin de creer des scripts scripts setup - cheni tous sa -->
<!-- Mixage entre vue et non vue avec aframe tres cheni -->

<!-- API Suisse tourimse -->
<!-- Gestion promesse pas top car faudrait pouvoir jouer et en attente il recuper les donnes et non pas d abord recuper donneer puis jouer -->
<!-- Récupérer les coord qui se trouve dans TheInfoLevel dans level au lieu de les renoter nous memes pour requete API '46.44124, 6.98694,46.41935, 6.95736' -->
<!-- Optimiser la partie requete / promesse -->
<!-- Contenu ecrit prend pas les accents, pbl a regler plus tard pas important -->

<!-- Scene -->
<!-- Faudrait deplacer les fonctions dans fichier js et essayer de faire une scene general (car une scena autre la glb change et la positon du box manuelle mais bcp d'information et structure vont se repeter) -->

<!-- FIN TODO - PBL a regler  -->

<!-- Information -->
<!-- Variable code dans TheScene pour primitive -->
<!-- Code = 1 Geometrie placer manuellement a trouver -->
<!-- Code = 2 Geometrie mis automatiquement (cube) -->
<!-- Code = 3 Geometrie pour passer au next level -->

<!-- TheInfoLevel.vue -->
<!-- Vue pour passer a une autre scene : apres chaque scene on affiche InfoLevel qui dit le prochain element a chercher -->

