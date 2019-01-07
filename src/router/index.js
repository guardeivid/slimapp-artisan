import Vue from 'vue';
import Router from 'vue-router';
import MakeController from '@/components/MakeController';
import MakeMiddleware from '@/components/MakeMiddleware';
import MakeMigration from '@/components/MakeMigration';
import MakeModel from '@/components/MakeModel';
import MakeSeeder from '@/components/MakeSeeder';
import MigrateController from '@/components/MigrateController';

Vue.use(Router);

export default new Router({
  //base: '/slimapp/artisan/',
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    // { path: '/', component: Foo, name: 'Dashboard' },
    // { path: '/bar', component: Bar, name: 'Bar' },
    { path: '/artisan/make/controller', component: MakeController, name: 'Create a new controller class' },
    { path: '/artisan/make/middleware', component: MakeMiddleware, name: 'Create a new middleware class' },
    { path: '/artisan/make/migration', component: MakeMigration, name: 'Create a new migration file' },
    { path: '/artisan/make/model', component: MakeModel, name: 'Create a new Eloquent model class' },
    { path: '/artisan/make/seeder', component: MakeSeeder, name: 'Create a new seeder class' },
    { path: '/artisan/migrate/migrate', component: MigrateController, name: 'Run all outstanding migrations' },
  ],
});
