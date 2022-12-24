import {createApp} from 'vue';
import App from './App.vue';
import {createWebHistory, createRouter} from 'vue-router';

const app = createApp(App)
import {
    AppUpdateAction,
    AppCreateActions,
    AppUserCard,
    AppCreateUser,
    AppUsersList,
    AppRestore,
    AppAuthPage,
    AppNotFound
} from "./components";

const routerHistory = createWebHistory();
const routes = [
    {path: '/restore', component: AppRestore, props: true},
    {path: '/authentication', component: AppAuthPage, props: true},
    {path: '/authorize', component: AppCreateUser, props: true},
    {path: '/users', query: {page: 1, limit: 5}, component: AppUsersList, props: true},
    {path: '/user/:id', component: AppUserCard, props: true},
    {path: '/user/:id/create-action', component: AppCreateActions, props: true},
    {path: '/user/:id/update-action/:action', component: AppUpdateAction, props: true},
    {path: '/not-found', component: AppNotFound},
    {path: '/:pathMatch(.*)*', redirect: '/not-found'}

]

const router = createRouter({
    history: routerHistory,
    routes: routes
});


app.use(router)
app.mount('#app')
