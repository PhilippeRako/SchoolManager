import { createRouter, createWebHistory } from 'vue-router';

import Login from '@/pages/Login.vue';
import Dashboard from '@/pages/Dashboard.vue';
import GestionEleves from '@/pages/GestionEleves.vue';
import GestionProfs from '@/pages/GestionProfs.vue';
import GestionClasses from '@/pages/GestionClasses.vue';
import GestionCours from '@/pages/GestionCours.vue';
import GestionPresences from '@/pages/GestionPresences.vue';
import GestionEcole from '@/pages/GestionEcole.vue';

const routes = [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/dashboard', component: Dashboard },

    {path: '/gestion-ecole', name: 'gestion-ecole', component: GestionEcole},
    { path: '/gestion-eleves', component: GestionEleves },
    { path: '/gestion-profs', component: GestionProfs },
    { path: '/gestion-classes', component: GestionClasses },
    { path: '/gestion-cours', component: GestionCours },
    { path: '/gestion-presences', component: GestionPresences }
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});
