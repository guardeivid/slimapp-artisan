# SlimApp-Artisan

Front-end de la herramienta **Artisan Web** que se incluye en el proyecto **SlimApp**. Proporciona una serie de comandos útiles que pueden ayudarlo mientras construye su aplicación.

**SlimApp-Artisan** ejecuta los comandos que son manejados por **SlimApp**.
Los comandos están basados en *Laravel 5.x* (sin utilizar la consola) y adaptados a *Slim 3*, permitiendo realizar las principales operaciones de creacion de clases (Models, Controllers, Migrations, Seeder, Validation) y ejecución de migraciones (Install, Migrate, Rollback, Reset, Refresh, Fresh) junto a semillas (Seed).

Se ejecuta desde un navegador web, a través de la ruta `http://localhost/path/to/slimapp/artisan`, por seguridad sólo se permite acceder desde `localhost` o ip `127.0.0.1`. Para ver la configuración ver la documentación de [SlimApp](https://github.com/guardeivid/slim-app/blob/master/README.md).

Los comandos de SlimApp-Artisan disponibles son:

- make:model
- make:controller
- make:middleware
- make:rule (validation, exception)
- make:migration
- make:seeder
- route:list
- migrate:install
- migrate
- migrate:rollback
- migrate:reset
- migrate:refresh
- migrate:fresh
- db:seed

### [Documentación](https://github.com/guardeivid/slimapp-artisan/wiki)

<details>
<summary>
<i>Project Vue </i>
</summary>

> A Vue.js project

## Instalacion

```sh
#v2
npm install --global vue-cli

#npm uninstall vue-cli -g

#v3
npm install -g @vue/cli
```

## Inicializacion

```sh
vue init webpack

#dev
npm update --save-dev

#prod
npm update

```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

</details>