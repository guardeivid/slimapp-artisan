<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="form-group">
          <label for="database">Nombre de la conexión a la base de datos</label>
          <input id="database" name="database" type="text" class="form-control" v-model="data.database" @change="command">
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="pretend" v-model="data.pretend" @change="command">
          <label class="custom-control-label" for="pretend">Simular la migración?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force" @change="command">
          <label class="custom-control-label" for="force">Ejecutar la operación en producción?</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md mb-3 d-flex justify-content-center">
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
        force: false,
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan migrate:reset';

      if (this.data.pretend) {
        cmd += ' --pretend';
      } else {

        if (this.data.force) {
          cmd += ' --force';
        }
      }

      if (this.data.database && this.data.database != 'default') {
        cmd += ' --database=' + this.data.database;
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      this.command();
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
