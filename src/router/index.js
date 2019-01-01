import Vue from 'vue';
import Router from 'vue-router';
import MakeController from '@/components/MakeController';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    // { path: '/', component: Foo, name: 'Dashboard' },
    // { path: '/bar', component: Bar, name: 'Bar' },
    { path: '/make:controller', component: MakeController, name: 'Create Controller Class' },
  ],
});
