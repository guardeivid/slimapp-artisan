import Vue from 'vue';
import Router from 'vue-router';
import MakeController from '@/components/MakeController';
import MakeMiddleware from '@/components/MakeMiddleware';
import MakeMigration from '@/components/MakeMigration';
import MakeModel from '@/components/MakeModel';
import MakeSeeder from '@/components/MakeSeeder';
import MakeValidation from '@/components/MakeValidation';
import Migrate from '@/components/Migrate';
import MigrateInstall from '@/components/MigrateInstall';
import MigrateRollback from '@/components/MigrateRollback';
import MigrateReset from '@/components/MigrateReset';
import MigrateRefresh from '@/components/MigrateRefresh';
import MigrateFresh from '@/components/MigrateFresh';
import DbSeed from '@/components/DbSeed';

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
    { path: '/artisan/make/validation', component: MakeValidation, name: 'Create a new validation rule and exception class' },
    { path: '/artisan/migrate/install', component: MigrateInstall, name: 'Create the migration repository' },
    { path: '/artisan/migrate/migrate', component: Migrate, name: 'Run all outstanding migrations' },
    { path: '/artisan/migrate/rollback', component: MigrateRollback, name: 'Rollback the last database migration' },
    { path: '/artisan/migrate/reset', component: MigrateReset, name: 'Rollback all database migrations' },
    { path: '/artisan/migrate/refresh', component: MigrateRefresh, name: 'Reset and re-run all migrations' },
    { path: '/artisan/migrate/fresh', component: MigrateFresh, name: 'Drop all tables and re-run all migrations' },
    { path: '/artisan/db/seed', component: DbSeed, name: 'Seed the database with records' },
  ],
});
