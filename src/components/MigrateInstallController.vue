<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-radio">
          <input id="database" name="database" type="text" class="form-control" v-model="data.database">
          <label for="database">Nombre de la conexión a la base de datos</label>
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
  name: 'MigrateInstallController',
  props: ['config'],
  data() {
    return {
      data: {
        database: 'default',
      },
    };
  },
  methods: {
    submit() {
      this.$parent.send('migrate/install', this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
