<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la migración</h4>
        <label for="name">Nombre de la migración</label>
        <input type="text" class="form-control" id="name" placeholder="[create|to|from|in]_{name}_table" required v-model="data.name" v-bind:class="{ 'border border-danger': !data.name }">
      </div>
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Seleccionar tipo de migración</h4>
        <br>
        <div class="custom-control custom-radio">
          <input id="create" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="create">
          <label class="custom-control-label" for="create">Create (crear)</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="table" name="type" type="radio" class="custom-control-input" checked required v-model="data.type" value="table">
          <label class="custom-control-label" for="table">Table (modificar)</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="mb-3">
            <label for="tablename">Nombre de la tabla</label>
            <input type="text" class="form-control" id="tablename" v-model="data.table">
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
  name: 'MakeMigration',
  props: ['config'],
  data() {
    return {
      data: {
        name: '',
        type: 'create',
        table: '',
      },
    };
  },
  methods: {
    submit() {
      if (!this.data.name) {
        return;
      }
      this.$parent.send('make/migration', this.data);
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
