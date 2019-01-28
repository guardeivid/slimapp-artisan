<template>
  <!-- eslint-disable max-len -->
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="form-group">
          <label for="method">Filtrar las rutas por método</label>
          <select type="text" class="form-control" id="method" placeholder="Class Seeder" v-model="data.method" @change="command">
            <option></option>
            <option v-for="option in data.methods" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="name">Filtrar las rutas por el nombre</label>
          <input id="name" name="name" type="text" class="form-control" v-model="data.name" @change="command">
        </div>
        <div class="form-group">
          <label for="path">Filtrar las rutas por el path</label>
          <input id="path" name="path" type="text" class="form-control" v-model="data.path" @change="command">
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="form-group">
          <label for="sort">Ordenar por?</label>
          <select type="text" class="form-control" id="sort" placeholder="Class Seeder" v-model="data.sort" @change="command">
            <option></option>
            <option v-for="option in data.sorts" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
        <br>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="reverse" v-model="data.reverse" @change="command">
            <label class="custom-control-label" for="reverse">Ordenar descendente
            </label>
        </div>
        <br>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'RouteList',
  props: ['config'],
  data() {
    return {
      data: {
        method: '',
        name: '',
        path: '',
        reverse: false,
        sort: '',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH', 'HEAD'],
        sorts: ['uri', 'method', 'name', 'action'],
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan route:list';

      if (this.data.method) {
        cmd += ` --method=${this.data.method}`;
      }

      if (this.data.name) {
        cmd += ` --name=${this.data.name}`;
      }

      if (this.data.path) {
        cmd += ` --path=${this.data.path}`;
      }

      if (this.data.sort) {
        cmd += ` --sort=${this.data.sort}`;
      }

      if (this.data.reverse) {
        cmd += ' --reverse';
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      this.command();
      this.$parent.send('route/list', this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
