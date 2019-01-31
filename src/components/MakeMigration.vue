<template>
  <!-- eslint-disable max-len -->
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la migración</h4>
        <label for="name">Nombre de la migración</label>
        <input type="text" class="form-control" id="name" placeholder="[create|to|from|in]_{name}_table" required v-model="data.name" v-bind:class="{ 'border border-danger': !data.name }" @change="command" />
      </div>
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Seleccionar tipo de migración</h4>
        <br>
        <div class="custom-control custom-radio">
          <input id="create" name="type" type="radio" class="custom-control-input" required v-model="data.type" value="create" @change="command" />
          <label class="custom-control-label" for="create">Create (crear)</label>
        </div>
        <div class="custom-control custom-radio">
          <input id="table" name="type" type="radio" class="custom-control-input" checked required v-model="data.type" value="table" @change="command" />
          <label class="custom-control-label" for="table">Table (modificar)</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md mb-3">
        <div class="mb-3">
            <label for="tablename">Nombre de la tabla</label>
            <input type="text" class="form-control" id="tablename" v-model="data.table" @change="command"
              />
        </div>
      </div>
    </div>
    <design-table :fields="data.fields" :options.sync="options" @updateOtionsParent="updateOptions" :indexes="data.indexes" :foreigns="data.foreigns">
    </design-table>
    <div class="row">
      <div class="col-md-6 mb-3 d-flex align-items-center">
        <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import DesignTable from '@/components/DesignTable';

export default {
  name: 'MakeMigration',
  components: {
    DesignTable,
  },
  props: ['config'],
  data() {
    return {
      options: {
        index: 0,
        default: '',
        comment: '',
        unsigned: false,
        autoincrement: false,
      },
      data: {
        name: '',
        type: 'create',
        table: '',
        custom: false,
        schema: '',
        fields: [{
          name: '',
          type: 'string',
          total: 0,
          decimal: 0,
          allownull: false,
          pk: false,
          default: '',
          comment: '',
          unsigned: false,
          autoincrement: false,
          valid: false,
        }],
        indexes: [{
          name: '',
          fields: '',
          type: 'index',
          valid: false,
        }],
        foreigns: [{
          name: '',
          fields: '',
          reftable: '',
          reffields: '',
          ondelete: '',
          onupdate: '',
          valid: false,
        }],
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:migration ';

      if (this.data.name) {
        cmd += `${this.data.name} --${this.data.type}=${this.data.table}`;

        if (this.data.custom) {
          cmd += ` --schema=${this.data.schema}`;
        }
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      if (!this.data.name) {
        return;
      }
      this.command();
      this.$parent.send('make/migration', this.data);
    },
    updateOptions() {
      const field = this.data.fields[this.options.index];
      field.default = this.options.default;
      field.comment = this.options.comment;
      field.unsigned = this.options.unsigned;
      field.autoincrement = this.options.autoincrement;
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
