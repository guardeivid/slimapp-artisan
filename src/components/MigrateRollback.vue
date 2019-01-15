<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="form-group">
          <label for="database">Nombre de la conexión a la base de datos</label>
          <input id="database" name="database" type="text" class="form-control" v-model="data.database" @change="command">
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="pretend" v-model="data.pretend" @change="command">
            <label class="custom-control-label" for="pretend">Simular deshacer las migraciones?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force"  @change="command">
          <label class="custom-control-label" for="force">Ejecutar la operación en producción?</label>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="form-group mb-3">
            <label class="" for="step">Número de migraciones a revertir (0 = última migración)
            </label>
            <input type="number" class="form-control" id="step" v-model="data.step" min="0" @change="command">
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
    command() {
      let cmd = '> php artisan migrate:rollback';

      if (this.data.pretend) {
        cmd += ' --pretend';
      } else {

        if (this.data.step) {
          cmd += ' --step=' + this.data.step;
        }

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
      //'migrate/rollback'
      const url = 'http://localhost/slimapp/artisan/migrate/rollback';
      this.$parent.send(url, this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
