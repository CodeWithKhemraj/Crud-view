import { createRouter, createWebHistory } from 'vue-router';

const UsersList = () => import('./components/users/List.vue');
const UsersCreate = () => import('./components/users/Add.vue');
const UsersEdit = () => import('./components/users/Edit.vue');
const HomeView = () => import('./components/HomeView.vue');
const AboutView = () => import('./components/AboutView.vue');

const routes = [
  { path: '/', component: HomeView, name: 'home' },
  { path: '/about', component: AboutView, name: 'about' },
  { path: '/users', component: UsersList, name: 'usersList' },
  { path: '/users/:id/edit', component: UsersEdit, name: 'usersEdit' },
  { path: '/users/:id/update', component: UsersEdit, name: 'usersEdit' },
  { path: '/users/add', component: UsersCreate, name: 'usersAdd' },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
