import { createRouter, createWebHistory } from 'vue-router';
import TheOnboarding from '../components/TheOnboarding.vue';
import Home from '../components/TheHome.vue';
import Scene1 from '../components/TheScene_Wabern.vue';
import Scene2 from '../components/TheScene.vue';

const routes = [
  {
    path: '/',
    name: 'TheOnboarding',
    component: TheOnboarding,
    props: { loaded: true } // Définissez la valeur de loaded directement ici
    },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/scene1',
    name: 'Scene1',
    component: Scene1,
  },
  {
    path: '/scene2',
    name: 'Scene2',
    component: Scene2,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



export default router;
