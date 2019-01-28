<template>
  <!-- eslint-disable max-len -->
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
        <div class="form-group">
          <label for="clase">Nombre de la clase raíz de los Seeder (opcional)</label>
          <select type="text" class="form-control" id="clase" placeholder="Class Seeder" v-model="data.clase" @change="command">
            <option></option>
            <option v-for="option in config.seeds" :key="option" v-bind:value="option">
              {{ option }}
            </option>
          </select>
        </div>
        <br>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force" @change="command">
          <label class="custom-control-label" for="force">Ejecutar la operación en producción?</label>
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
  name: 'DbSeed',
  props: ['config'],
  data() {
    return {
      data: {
        database: 'default',
        clase: '',
        force: false,
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan db:seed';

      if (this.data.clase !== '') {
        cmd += ` --class=${this.data.clase}`;
      }

      if (this.data.force) {
        cmd += ' --force';
      }

      if (this.data.database && this.data.database !== 'default') {
        cmd += ` --database=${this.data.database}`;
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      this.command();
      this.$parent.send('db/seed', this.data);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
