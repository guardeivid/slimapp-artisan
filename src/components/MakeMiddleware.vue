<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del middleware</h4>
        <label for="name">Nombre de la clase del middleware</label>
        <input type="text" class="form-control" id="name" placeholder="NameMiddleware" required v-model="data.name" @blur="nameMiddleware" v-bind:class="{ 'border border-danger': !data.name }">
        <br>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force" @change="command">
          <label class="custom-control-label" for="force">Sobreescribir si ya existe la clase?</label>
        </div>
      </div>
      <div class="col-md-6 mb-3 d-flex align-items-center">
        <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MakeMiddleware',
  props: ['config'],
  data() {
    return {
      data: {
        force: false,
        name: '',
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:middleware ';

      if (this.data.name) {
        cmd += this.data.name;

        if (this.data.force) {
          cmd += ' --force';
        }

      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      if (!this.data.name) {
        return;
      }
      this.command();
      this.$parent.send('make/middleware', this.data);
    },
    nameMiddleware() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'Middleware');
      this.command();
    },
  },
};
</script>

<style scoped>
  h1, h2, h4 {
    font-weight: normal;
  }
</style>
