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
        <router-link to="/" class="nav-link">
          <span data-feather="home"></span>
          Dashboard
        </router-link>
      </li>
      <li class="nav-item">
        <router-link to="bar" class="nav-link">
          <span data-feather="file"></span>
          Orders
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="shopping-cart"></span>
          Products
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="users"></span>
          Customers
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="bar-chart-2"></span>
          Reports
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="layers"></span>
          Integrations
        </a>
      </li>
    </ul>

    <h6 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
      <span>Make</span>
      <a class="d-flex align-items-center text-muted" href="#">
        <span data-feather="plus-circle"></span>
      </a>
    </h6>
    <ul class="nav flex-column mb-2">
      <li class="nav-item">
        <router-link to="/make:controller" class="nav-link">
          <span data-feather="file-text"></span>
          Controller
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Model
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Middelware
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Migration
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Seeder
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <span data-feather="file-text"></span>
          Auth
        </a>
      </li>
    </ul>
  </div>
</nav>

          <main class="col-md-9 ml-sm-auto col-lg-10 px-4">
            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2" v-text="title"></h1>
                          </div>
            <router-view v-bind:config="config"></router-view>
          </main>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const self = this;
    fetch('http://localhost/slimapp/artisan/models')
      .then(response => response.json())
      .then((json) => {
        self.config.models = json;
      });
  },
  data() {
    return {
      title: 'Dashboard',
      config: {
        slim: false,
        fill: true,
        models: [],
      },
    };
  },
  watch: {
    // whenever $route changes, this function will run
    $route(to) {
      this.title = to.name;
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
