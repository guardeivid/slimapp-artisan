<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre del modelo</h4>
        <label for="name">Nombre del modelo</label>
        <input type="text" class="form-control" id="name" placeholder="Model" required v-model="data.name" @blur="nameModel" v-bind:class="{ 'border border-danger': !data.name }">
        <br>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force">
          <label class="custom-control-label" for="force">Sobreescribir si ya existe la clase?</label>
        </div>
        <div class="d-flex justify-content-center">
          <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Opciones</h4>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="all" v-model="data.all" @change="all">
          <label class="custom-control-label" for="all">Generar una <em>migration</em>, <em class="text-muted">factory</em>, y <em>resource controller</em> para el modelo</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="controller" v-model="data.controller">
          <label class="custom-control-label" for="controller">Crear un nuevo <b>controller</b> para el modelo</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="resource" v-model="data.resource" @change="noall">
          <label class="custom-control-label" for="resource">El controlador es un <b>resource controller</b>?</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="migration" v-model="data.migration" @change="noall">
          <label class="custom-control-label" for="migration">Crear un archivo de <b>migration</b> para el modelo</label>
        </div>
        <!--<div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="factory" v-model="data.factory" @change="noall">
          <label class="custom-control-label" for="factory">Crear una nueva <b>factory</b> para el modelo</label>
        </div>
        -->
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pivot" v-model="data.pivot">
          <label class="custom-control-label" for="pivot">El modelo es una tabla intermedia <b>pivot</b>?</label>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MakeModel',
  props: ['config'],
  data() {
    return {
      data: {
        name: '',
        //Generate a migration, factory, and resource controller for the model
        all: false,
        //Create a new controller for the model
        controller: false,
        //Create a new factory for the model
        factory: false,
        //Create a new migration file for the model
        migration: false,
        //Indicates if the generated model should be a custom intermediate table model
        pivot: false,
        //Indicates if the generated controller should be a resource controller
        resource: false,
        //Create the class even if the model already exists
        force: false,
      },
    };
  },
  methods: {
    submit() {
      if (!this.data.name) {
        return;
      }
      this.$parent.send('make/model', this.data);
    },
    nameModel() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, '');
    },
    all() {
      if (this.data.all) {
        this.data.controller = true;
        //this.data.factory = true; //no implementado
        this.data.migration = true;
        this.data.resource = true;
      }
    },
    noall() {
      if (this.data.resource === false || this.data.migration === false) {
        // || this.data.factory === false
        this.data.all = false;
      } else {
        this.data.all = true;
        this.data.controller = true;
      }
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
