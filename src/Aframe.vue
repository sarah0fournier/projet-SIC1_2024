<script setup>
  import { ref } from 'vue';
  import router from './router';
  
  const loaded = ref(false);
</script>


<style>


</style>

<template>
    <router-view></router-view>
</template>

<!-- DEBUT TODO - PBL a regler  -->

<!-- Animation / Navigation scene -->
<!-- Possible de gerer le temps avant de passer a une page (eg. curseur doit rester min 2 sec sur le bouton pour que sa change de page)-->

<!-- Score disparait si met en mode VR  -->
<!-- -> A essayer en isntallant package  'aframe-html-shader' puis donc three mais sans succes -->
<!-- Quand on tue un fantome cela nous rajoute 2 pts alors que cela devrait en rajouter que un ? -->

<!-- General -->
<!-- Router pas sure de faire tout juste et chaque besoin de creer des scripts scripts setup - cheni tous sa -->
<!-- Mixage entre vue et non vue avec aframe tres cheni --> 

<!-- API Suisse tourimse -->
<!-- Gestion promesse pas top car faudrait pouvoir jouer et en attente il recuper les donnes et non pas d abord recuper donneer puis jouer -->
<!-- Optimiser la partie requete / promesse -->
<!-- Contenu ecrit prend pas les accents, pbl a regler plus tard pas important -->

<!-- Scene -->
<!-- Faudrait deplacer les fonctions dans fichier js et etre coherent dans code entre vue ou non -->
<!-- Faudrait faire un fichier js pour tout ce qui est déplacement de fantome, NG a pas réussi, je comprends rien à quel lien il faut faire ou? -->

<!-- RESTE A FAIRE  -->
<!-- faire ukne deuxiéme scène -> NG -->
<!-- placer le plan à trouver correctement et le mettre en invisible  -->
<!-- faire le fonds pour que ça soit joli -->

<!-- A DEMANDER  -->
<!-- Gérer le le clic manette ???? -->
<!-- Afficher les scores dans la VR -->

<!-- FIN TODO - PBL a regler  -->

<!-- Information -->
<!-- Variable code dans TheScene pour primitive -->
<!-- Code = 1 Geometrie placer manuellement a trouver -->
<!-- Code = 2 Geometrie mis automatiquement (cube) -->
<!-- Code = 3 Geometrie pour passer a une prochaine page (level) -->

<!-- TheInfoLevel.vue -->
<!-- Vue pour passer a une autre scene : apres chaque scene on affiche InfoLevel qui dit le prochain element a chercher -->

<!-- DEBUT TODO (en plus de gerer problemes) -->
<!-- Avoir des blocs qui vont contre utilisateur puis quand atterit sur utilisateur adapter le score (actuelement score sur le nbr bloc démoli) -->
<!-- Creer une autre gdb -->
<!-- Adapter la positon des primitives a trouver en fonction des gdb -->
<!-- Interaction avec un autre bouton eg pour pouvoir mettre pause -->
<!-- Gestion information si mis en VR ou non -->


