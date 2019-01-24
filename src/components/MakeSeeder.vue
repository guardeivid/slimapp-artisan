<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del seeder</h4>
        <label for="name">Nombre de la clase del seeder</label>
        <input type="text" class="form-control" id="name" placeholder="NameSeeder" required v-model="data.name" @blur="NameSeeder" v-bind:class="{ 'border border-danger': !data.name }">
      </div>
      <div class="col-md-6 mb-3">
        <br><br>
        <label for="model">Nombre del modelo (opcional)</label>
        <select type="text" class="form-control" id="model" placeholder="Model" required v-model="data.model" @change="command">
          <option></option>
          <option v-for="option in config.models" :key="option" v-bind:value="option">{{ option }}</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force" @change="command">
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
//<pre>{{ $data }}, {{ $props }}</pre>
export default {
  name: 'MakeSeeder',
  props: ['config'],
  data() {
    return {
      data: {
        name: '',
        model: '',
        force: false,
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:seeder ';

      if (this.data.name) {
        cmd += this.data.name;

        if (this.data.model) {
          cmd += " --model=" + this.data.model;
        }

        if (this.data.force) {
          cmd += " --force";
        }
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      if (!this.data.name) {
        return;
      }
      this.command();
      this.$parent.send('make/seeder', this.data, this.$parent.fetchSeeds);
    },
    NameSeeder() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'TableSeeder');
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
