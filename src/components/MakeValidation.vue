<template>
  <!-- eslint-disable max-len -->
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase de la regla de validación</h4>
        <label for="name">Nombre de la clase de la regla de validación</label>
        <input type="text" class="form-control" id="name" placeholder="nameRule" required v-model="data.name" @blur="nameRule" v-bind:class="{ 'border border-danger': !data.name }">
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
  name: 'MakeValidation',
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
      let cmd = '> php artisan make:rule ';

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
      this.$parent.send('make/validation', this.data);
    },
    nameRule() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, '');
      this.command();
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
