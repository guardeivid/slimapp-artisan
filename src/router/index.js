import Vue from 'vue';
import Router from 'vue-router';
import MakeController from '@/components/MakeController';
import MakeMiddleware from '@/components/MakeMiddleware';

Vue.use(Router);

export default new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    // { path: '/', component: Foo, name: 'Dashboard' },
    // { path: '/bar', component: Bar, name: 'Bar' },
    { path: '/make/controller', component: MakeController, name: 'Create a new controller class' },
    { path: '/make/middleware', component: MakeMiddleware, name: 'Create a new middleware class' },
  ],
});
