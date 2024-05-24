/**
 * =======================================================================================
 * Configuration du router Vue.js pour gérer la navigation au sein de l'application.
 * =======================================================================================
 */

import { createRouter, createWebHistory } from 'vue-router';
import TheOnboarding from '../components/TheOnboarding.vue';
import Home from '../components/TheHome.vue';
import Scene from '../components/TheScene_all.vue';
import InfoLevel from '../components/TheInfoLevel.vue';


const routes = [
  {
    path: '/',
    name: 'TheOnboarding',
    component: TheOnboarding,
    props: { loaded: true } // Définir la valeur de loaded directement ici
    },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/scene:level',  //Realiser une vue pour toutes les scenes
    name: 'Scene',
    component: Scene,
  },
  {
    path: '/InfoLevel:level', //Realiser une vue pour tous les niveaux
    name: 'InfoLevel',
    component: InfoLevel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
