<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del controlador</h4>
        <label for="name">Nombre de la clase del controlador</label>
        <input type="text" class="form-control" id="name" placeholder="NameController" required v-model="data.name" @blur="nameController" v-bind:class="{ 'border border-danger': !data.name }">
      </div>
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Seleccionar tipo de controlador</h4>
        <div class="custom-control custom-radio">
          <input id="resource" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="resource" @change="command">
          <label class="custom-control-label" for="resource">Resource</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="credit" name="type" type="radio" class="custom-control-input" checked required v-model="data.type" value="plain" @change="command">
          <label class="custom-control-label" for="credit">Plain</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="invokable" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="invokable" @change="command">
          <label class="custom-control-label" for="invokable">Invokable</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3" v-if="data.type === 'resource'">
            <input type="checkbox" class="custom-control-input" id="route" v-model="data.route">
            <label class="custom-control-label" for="route">Registrar <em>Route::resource</em>
            </label>
        </div>
        <div v-if="data.type === 'resource'">
          <label for="model">Nombre del modelo (opcional)</label>
          <select type="text" class="form-control" id="model" placeholder="Model" required v-model="data.model" @change="command">
            <option></option>
            <option v-for="option in config.models" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
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
  name: 'MakeController',
  props: ['config'],
  data() {
    return {
      data: {
        type: 'resource',
        route: true,
        force: false,
        name: '',
        model: '',
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:controller ';

      if (this.data.name) {
        cmd += this.data.name;

        if (this.data.type) {
          cmd += ' --' + this.data.type;
        }
        
        if (this.data.model) {
          cmd += ' --model=' + this.data.model;
        }

      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      if (!this.data.name) {
        return;
      }
      this.command();
      this.$parent.send('make/controller', this.data);
    },
    nameController() {
      if (!this.data.name){
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'Controller');
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
