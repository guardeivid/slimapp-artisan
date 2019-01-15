<template>
  <div id="main">
      <nav class="navbar navbar-dark bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Artisan</a>
        <ul class="navbar-nav px-3">
          <li class="nav-item text-nowrap">
            <a class="nav-link" href="#">Sign out</a>
          </li>
        </ul>
      </nav>

      <div class="container-fluid">
        <div class="row">

          <nav class="col-md-2 d-none d-md-block bg-light sidebar">
            <div class="sidebar-sticky">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <router-link to="/artisan" class="nav-link">
                    <span data-feather="home"></span>
                    Config
                  </router-link>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Make</span>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <router-link to="/artisan/make/controller" class="nav-link">
                    <span data-feather="file-text"></span>
                    Controller
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/artisan/make/model" class="nav-link">
                    <span data-feather="file-text"></span>
                    Model
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/artisan/make/middleware" class="nav-link">
                    <span data-feather="file-text"></span>
                    Middelware
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/artisan/make/validation" class="nav-link">
                    <span data-feather="file-text"></span>
                    Validation
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/artisan/make/migration" class="nav-link">
                    <span data-feather="file-text"></span>
                    Migration
                  </router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/artisan/make/seeder" class="nav-link">
                    <span data-feather="file-text"></span>
                    Seeder
                  </router-link>
                </li>
                <!--<li class="nav-item">
                  <router-link to="/artisan/make/auth" class="nav-link">
                    <span data-feather="file-text"></span>
                    Auth
                  </router-link>
                </li>-->
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Route</span>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <router-link to="/artisan/route/list" class="nav-link">
                    <span data-feather="link"></span>
                    List
                  </router-link>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Migrate</span>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <router-link to="/artisan/migrate/install" class="nav-link">
                    <span data-feather="database"></span>
                    Install
                  </router-link>
                  <router-link to="/artisan/migrate/migrate" class="nav-link">
                    <span data-feather="database"></span>
                    Migrate
                  </router-link>
                  <router-link to="/artisan/migrate/rollback" class="nav-link">
                    <span data-feather="database"></span>
                    Rollback
                  </router-link>
                  <router-link to="/artisan/migrate/reset" class="nav-link">
                    <span data-feather="database"></span>
                    Reset
                  </router-link>
                  <router-link to="/artisan/migrate/refresh" class="nav-link">
                    <span data-feather="database"></span>
                    Refresh
                  </router-link>
                  <router-link to="/artisan/migrate/fresh" class="nav-link">
                    <span data-feather="database"></span>
                    Fresh
                  </router-link>
                </li>
              </ul>

              <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>DB</span>
              </h6>
              <ul class="nav flex-column mb-2">
                <li class="nav-item">
                  <router-link to="/artisan/db/seed" class="nav-link">
                    <span data-feather="database"></span>
                    Seed
                  </router-link>
                </li>
              </ul>
            </div>
          </nav>

          <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2" v-text="title"></h1>
                          </div>
            <router-view v-bind:config="config" v-bind:result="result"></router-view>
            <result v-bind:result="result"></result>
          </main>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import Result from '@/components/Result';

export default {
  name: 'App',
  components: {
    Result
  },
  created() {
    const self = this;
    //'artisan/models'
    let url = 'http://localhost/slimapp/artisan/models';
    fetch(url)
      .then(response => response.json())
      .then((json) => {
        self.config.models = json;
      });

    //'artisan/seeds'
    let url2 = 'http://localhost/slimapp/artisan/seeds';
    fetch(url2)
      .then(response => response.json())
      .then((json) => {
        self.config.seeds = json;
      });
  },
  data() {
    return {
      title: 'Dashboard',
      host: 'http://localhost/slimapp/artisan', //location.href,
      config: {
        slim: false,
        fill: true,
        console: true,
        models: [],
        seeds: [],
        csrf: {
          csrf_name: document.getElementById('csrf_name').value,
          csrf_value: document.getElementById('csrf_value').value,
        },
      },
      result: {
        info: [],
        error: [],
        notes: [],
      }
    };
  },
  watch: {
    // whenever $route changes, this function will run
    $route(to) {
      this.title = to.name;
      this.result = {
        info: [],
        error: [],
        notes: [],
      };
    },
  },
  methods: {
    fillName(name, fill) {
      let fillname = this.fixName(name);
      if (this.config.fill) {
        const re = new RegExp(fill, 'gi');
        const space = fillname.split('\\');
        space[space.length - 1] = space[space.length - 1]
          .charAt(0).toUpperCase() + space[space.length - 1].slice(1)
          .replace(re, '')
          .concat(fill);
        fillname = space.join('\\');
      }
      return fillname;
    },
    fixName(name) {
      return name.replace(/\s/g, '').replace(/\//g, '\\');
    },
    send(url, data) {
      const self = this;
      axios({
        method: 'POST',
        url: this.host + '/' + url,
        //url: url,
        data: Object.assign({}, this.config.csrf, data),
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(function (response) {
          if (response.data.note) {
            let cmd = self.result.notes[0];
            self.result.notes = [cmd, '&nbsp;', ...response.data.note];
          } else {
            self.result = response.data;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addCommand(cmd) {
      this.result.notes = [cmd];
    },
    setConfig(key, val) {
      this.config[key] = val;
    },
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
