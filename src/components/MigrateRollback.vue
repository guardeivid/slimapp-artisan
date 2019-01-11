<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-radio">
          <label for="database">Nombre de la conexión a la base de datos</label>
          <input id="database" name="database" type="text" class="form-control" v-model="data.database">
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="pretend" v-model="data.pretend">
            <label class="custom-control-label" for="pretend">Simular deshacer las migraciones?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <label class="" for="step">Número de migraciones a revertir (0 = última migración)
            <input type="number" class="form-control" id="step" v-model="data.step" min="0">
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force">
          <label class="custom-control-label" for="force">Ejecutar en producción?</label>
        </div>
      </div>
      <div class="col-md mb-3 d-flex justify-content-center">
        <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MigrateRollback',
  props: ['config'],
  data() {
    return {
      data: {
        database: 'default',
        pretend: false,
        step: 0,
        force: false,
      },
    };
  },
  methods: {
    submit() {
      this.$parent.send('migrate/rollback', this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
