import { createRouter, createWebHistory } from 'vue-router';
import TheOnboarding from '../components/TheOnboarding.vue';
import Home from '../components/TheHome.vue';
import Scene from '../components/TheScene_all.vue';
import Scene2 from '../components/TheScene.vue';
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
    path: '/scene:level',  //1 vue pour toute les scenes
    name: 'Scene',
    component: Scene,
  },
  {
    path: '/InfoLevel:level',
    name: 'InfoLevel',
    component: InfoLevel,
  },
  {
    path: '/scene2', // A supprimer a la fin est la pour des tests
    name: 'Scene2',
    component: Scene2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
