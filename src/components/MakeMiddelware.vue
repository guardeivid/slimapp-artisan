<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del middleware</h4>
        <label for="name">Nombre de la clase del middleware</label>
        <input type="text" class="form-control" id="name" placeholder="NameMiddelware" required v-model="data.name" @blur="nameMiddelware" v-bind:class="{ 'border border-danger': !data.name }">
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
    <pre>{{ $data }}, {{ $props }}</pre>
  </div>
</template>

<script>
  //<pre>{{ $data }}</pre>
import axios from 'axios';

export default {
  name: 'MakeMiddelware',
  props: ['config'],
  data() {
    return {
      data: {
        route: true,
        name: '',
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
        url: 'artisan/make/middleware',
        data: Object.assign({}, this.config.csrf, this.data),
        headers: {
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
    nameMiddelware() {
      if (!this.data.name){
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'Middelware');
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
