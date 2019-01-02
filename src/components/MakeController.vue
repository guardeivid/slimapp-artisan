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
          <input id="resource" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="resource">
          <label class="custom-control-label" for="resource">Resource</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="credit" name="type" type="radio" class="custom-control-input" checked required v-model="data.type" value="plain">
          <label class="custom-control-label" for="credit">Plain</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="invokable" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="invokable">
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
          <select type="text" class="form-control" id="model" placeholder="Model" required v-model="data.model">
            <option></option>
            <option v-for="option in config.models" :key="option" v-bind:value="option">{{ option }}</option>
          </select>
        </div>
        <br>
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
    <pre>{{ $data }}, {{ $props }}</pre>
  </div>
</template>

<script>
  //<pre>{{ $data }}</pre>
import axios from 'axios';

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
        model: "",
      },
    };
  },
  methods: {
    submit() {
      if (!this.data.name) {
        return;
      }
      axios({
        method: 'POST',
        url: 'http://localhost/slimapp/artisan/make/controller',
        data: Object.assign({}, this.config.csrf, this.data),
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    nameController() {
      if (!this.data.name){
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'Controller');
    },
  },
};
</script>

<style scoped>
  h1, h2, h4 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
</style>
