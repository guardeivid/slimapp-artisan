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
      <div class="col-md-9 mb-3">
        <label for="tablename">Nombre de la tabla</label>
        <input type="text" class="form-control" id="tablename" v-model="data.table" @change="setTableName"
          />
      </div>
      <div class="col-md-3 d-flex align-items-end">
        <div class="custom-control custom-checkbox mb-4 ml-2">
          <input type="checkbox" class="custom-control-input" v-model="data.custom" id="custom" @change="upcommand" :disabled="!custom">
          <label class="custom-control-label" for="custom"> Personalizar Tabla
          </label>
        </div>
      </div>
    </div>
    <design-table :fields="data.fields" :options.sync="options" @updateOtionsParent="updateOptions" :indexes="data.indexes" :foreigns="data.foreigns" v-if="data.custom">
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
          nullable: false,
          pk: false,
          default: '',
          comment: '',
          unsigned: false,
          autoincrement: false,
          srid: -1,
          valid: false,
          ispk: true,
          isfun: false,
          isnull: false,
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
      custom: false,
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:migration ';

      if (this.data.name) {
        cmd += `${this.data.name} --${this.data.type}=${this.data.table}`;

        if (this.data.custom) {
          this.setSchema();
          cmd += ` --schema=${this.data.schema}`;
        }
      }

      this.$parent.addCommand(cmd);
    },
    upcommand() {
      const self = this;
      setTimeout(() => {
        self.command();
      }, 100);
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
    setTableName() {
      this.custom = this.data.table !== '';
      if (!this.custom) {
        this.data.custom = false;
      }
      this.upcommand();
    },
    setSchema() {
      const fields = this.getFieldsSchema();
      const indexes = this.getIndexesSchema();
      const foreigns = this.getForeignsSchema();
      const schema = [...fields, ...indexes, ...foreigns];

      this.data.schema = schema.join(', ');
    },
    getFieldsSchema() {
      const schema = [];

      for (let i = 0, n = this.data.fields.length; i < n; i += 1) {
        const field = this.data.fields[i];
        if (field.valid) {
          if (field.isfun) {
            schema.push(`${field.type}:fx`);
          } else {
            let str = `${field.name}:${field.type}`;

            if (this.$children[0].isDate(field.type) && field.total > 0 && field.total <= 10) {
              str += `(${field.total})`;
            } else if (this.$children[0].isGeometry(field.type)) {
              str += `(${field.srid})`;
            } else {
              if (parseInt(field.total, 10) !== 0) {
                str += `(${field.total}`;
                if (this.$children[0].isDecimal(field.type) &&
                  parseInt(field.decimal, 10) !== 0) {
                  str += `,${field.decimal}`;
                }
                str += ')';
              }
            }

            if (!this.$children[0].isIncrements(field.type) &&
              !this.$children[0].isUnsigned(field.type)) {
              str += field.unsigned ? ':unsigned' : '';
            }
            if (!this.$children[0].isIncrements(field.type)) {
              str += field.nullable ? ':nullable' : '';
              str += field.autoincrement ? ':autoIncrement' : '';
              if (field.default) {
                if (isNaN(field.default)) {
                  str += `:default('${field.default}')`;
                } else {
                  str += `:default(${field.default})`;
                }
              }
            }

            str += field.comment ? `:comment('${field.comment}')` : '';

            schema.push(str);
          }
        }
      }

      return schema;
    },
    getIndexesSchema() {
      const schema = [];

      for (let i = 0, n = this.data.indexes.length; i < n; i += 1) {
        const index = this.data.indexes[i];
        if (index.valid) {
          let str = '';
          const flds = index.fields.split(', ');
          if (flds.length > 1) {
            str += `${index.type}:index(['${flds.join('\',\'')}']`;
          } else {
            str += `${index.type}:index('${index.fields}'`;
          }

          str += index.name ? `,'${index.name}'` : '';
          str += ')';

          schema.push(str);
        }
      }

      return schema;
    },
    getForeignsSchema() {
      const schema = [];

      for (let i = 0, n = this.data.foreigns.length; i < n; i += 1) {
        const foreign = this.data.foreigns[i];
        if (foreign.valid) {
          let str = '';
          const flds = foreign.fields.split(', ');
          if (flds.length > 1) {
            str += `:foreign(['${flds.join('\',\'')}']`;
          } else {
            str += `:foreign('${foreign.fields}'`;
          }

          str += foreign.name ? `,'${foreign.name}'` : '';
          str += `):references('${foreign.reffields}'):on('${foreign.reftable}')`;

          str += foreign.ondelete ? `:onDelete('${foreign.ondelete}')` : '';
          str += foreign.onupdate ? `:onUpdate('${foreign.onupdate}')` : '';

          schema.push(str);
        }
      }

      return schema;
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
