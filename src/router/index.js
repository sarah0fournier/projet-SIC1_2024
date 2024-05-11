import { createRouter, createWebHistory } from 'vue-router';
import TheOnboarding from '../components/TheOnboarding.vue';
import Home from '../components/TheHome.vue';
import Scene1 from '../components/TheScene_RocherNaye.vue';
import Scene2 from '../components/TheScene.vue';
import InfoLevel from '../components/TheInfoLevel.vue';


const routes = [
  {
    path: '/',
    name: 'TheOnboarding',
    component: TheOnboarding,
    props: { loaded: true } // Définissez la valeur de loaded directement ici
    },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/scene1',  // Level 1
    name: 'Scene1',
    component: Scene1,
  },
  {
    path: '/InfoLevel:level',
    name: 'InfoLevel',
    component: InfoLevel,
  },
  {
    path: '/scene2', // Level 2
    name: 'Scene2',
    component: Scene2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
