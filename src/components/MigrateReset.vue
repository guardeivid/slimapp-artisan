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
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="pretend" v-model="data.pretend">
            <label class="custom-control-label" for="pretend">Simular la migración?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="step" v-model="data.step">
            <label class="custom-control-label" for="step">Ejecutar migraciones de una en una, para permitir <em>migrate:rollback</em> individualmente?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="seed" v-model="data.seed">
            <label class="custom-control-label" for="seed">Ejecutar la tarea <b>db:seed</b>?
            </label>
        </div>
        <div v-if="data.seed">
          <div class="form-group">
            <label for="clase">Nombre de la clase raíz de los Seeder (opcional)</label>
            <select type="text" class="form-control" id="clase" placeholder="Class Seeder" v-model="data.clase">
              <option></option>
              <option v-for="option in config.seeds" :key="option" v-bind:value="option">{{ option }}</option>
            </select>
          </div>
          <br>
          <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="force" v-model="data.force">
            <label class="custom-control-label" for="force">Ejecutar <b>db:seed</b> en producción?</label>
          </div>
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
  name: 'MigrateReset',
  props: ['config'],
  data() {
    return {
      data: {
        database: 'default',
        pretend: false,
        seed: false,
        step: false,
        clase: '',
        force: false,
      },
    };
  },
  methods: {
    submit() {
      this.$parent.send('migrate/reset', this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
