import Vue from 'vue';
import Router from 'vue-router';
import MakeController from '@/components/MakeController';
import MakeMiddleware from '@/components/MakeMiddleware';
import MakeMigration from '@/components/MakeMigration';
import MakeModel from '@/components/MakeModel';
import MakeSeeder from '@/components/MakeSeeder';
import MigrateController from '@/components/MigrateController';
import MigrateInstallController from '@/components/MigrateInstallController';
import MigrateRollbackController from '@/components/MigrateRollbackController';
import MigrateResetController from '@/components/MigrateResetController';
import MigrateRefreshController from '@/components/MigrateRefreshController';
import MigrateFreshController from '@/components/MigrateFreshController';
import DbSeedController from '@/components/DbSeedController';

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
    { path: '/artisan/migrate/install', component: MigrateInstallController, name: 'Create the migration repository' },
    { path: '/artisan/migrate/migrate', component: MigrateController, name: 'Run all outstanding migrations' },

    { path: '/artisan/migrate/rollback', component: MigrateRollbackController, name: 'Rollback the last database migration' },
    { path: '/artisan/migrate/reset', component: MigrateResetController, name: 'Rollback all database migrations' },
    { path: '/artisan/migrate/refresh', component: MigrateRefreshController, name: 'Rollback all database migrations' },
    { path: '/artisan/migrate/fresh', component: MigrateFreshController, name: 'Rollback all database migrations' },
    { path: '/artisan/db/seed', component: DbSeedController, name: 'Rollback all database migrations' },
  ],
});
