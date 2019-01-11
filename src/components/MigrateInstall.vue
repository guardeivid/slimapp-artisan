<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="custom-control custom-radio">
          <label for="database">Nombre de la conexión a la base de datos</label>
          <input id="database" name="database" type="text" class="form-control" v-model="data.database" @change="command">
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
  name: 'MigrateInstall',
  props: ['config'],
  data() {
    return {
      data: {
        database: 'default',
      },
    };
  },
  methods: {
    command() {
      let cmd = '>php artisan migrate:install';

      if (this.data.database && this.data.database != 'default') {
        cmd += ' --database=' + this.data.database;
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      this.command();
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
