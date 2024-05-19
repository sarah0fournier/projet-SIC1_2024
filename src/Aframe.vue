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
<!-- -> A essayer en installant package  'aframe-html-shader' puis donc three mais sans succes -->

<!-- General -->
<!-- Router pas sure de faire tout juste et chaque besoin de creer des scripts scripts setup - cheni tous sa -->
<!-- Mixage entre vue et non vue avec aframe tres cheni --> 

<!-- API Suisse tourimse -->
<!-- Gestion promesse pas top car faudrait pouvoir jouer et en attente il recuper les donnes et non pas d abord recuper donneer puis jouer -->
<!-- Optimiser la partie requete / promesse -->
<!-- Contenu ecrit prend pas les accents, pbl a regler plus tard pas important -->

<!-- Scene -->
<!-- Faudrait deplacer les fonctions dans fichier js et etre coherent dans code entre vue ou non -->


<!-- RESTE A FAIRE  -->
<!-- faire une deuxiéme scène -> NG  1GLB FME et 1 GLBBlOSM  --> 
<!-- placer le plan à trouver correctement et le mettre en invisible -> NG -->
<!-- faire le fonds pour que ça soit joli -> NG-->
<!-- API compte protomail -> NG -->

<!-- Mettre au propre dans un JS tout ce qui pour le cube  -->
<!-- cube = FOE -->
<!-- Mettre au propre le code ? -->


<!-- PROPOSITION DE QUESTION POUR MARDI 21.05.24 -->
<!-- Afficher score VR -->
<!-- Gestion du trigger + test sur ordi -->
<!-- Pbl avec gestion score - pbl de liaison entre fichier -->
<!-- THEORIQUE : Utilisation des vues dans a-frame (script VS script setup) -->
<!-- THEORIQUE : Utilisation API comment gerer les accents -->



<!-- A DEMANDER  -->
<!-- Gérer le le clic manette ???? -->
<!-- Comment ça fontionne pas compris l'exemple  -->
<!-- Et comment tester avec l'ordi ? -->
<!-- on a réussi à trouver la doc (librairie Blink control)  -->
<!-- exemple concret simple ? vide si possible ? -->
<!-- Mardi après midi dispo -->




<!-- Promesses API , et chargemnt des GLB et jpeg -> est- ce que ça les charge en mêm temps ?-->

<!-- FIN TODO - PBL a regler  -->

<!-- Information -->
<!-- Variable code dans TheScene pour primitive -->
<!-- Code = 1 Geometrie placer manuellement a trouver -->
<!-- Code = 2 Geometrie mis automatiquement (cube) -->
<!-- Code = 3 Geometrie pour passer a une prochaine page (level) -->

<!-- TheInfoLevel.vue -->
<!-- Vue pour passer a une autre scene : apres chaque scene on affiche InfoLevel qui dit le prochain element a chercher -->

<!-- DEBUT TODO (en plus de gerer problemes) -->
<!-- Creer une autre gdb -->
<!-- Adapter la positon des primitives a trouver en fonction des gdb -->
<!-- Interaction avec un autre bouton eg pour pouvoir mettre pause -->
<!-- Gestion information si mis en VR ou non -->


