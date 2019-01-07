<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del middleware</h4>
        <label for="name">Nombre de la clase del middleware</label>
        <input type="text" class="form-control" id="name" placeholder="NameMiddleware" required v-model="data.name" @blur="nameMiddleware" v-bind:class="{ 'border border-danger': !data.name }">
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force">
          <label class="custom-control-label" for="force">Sobreescribir si ya existe la clase?</label>
        </div>
      </div>
      <div class="col-md-6 mb-3">
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
    submit() {
      if (!this.data.name) {
        return;
      }
      this.$parent.send('make/middleware', this.data);
    },
    nameMiddleware() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'Middleware');
    },
  },
};
</script>

<style scoped>
  h1, h2, h4 {
    font-weight: normal;
  }
</style>
