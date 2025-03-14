import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Notes from '../views/Notes.vue';
import Register from '../views/Register.vue';

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/notes', component: Notes }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;