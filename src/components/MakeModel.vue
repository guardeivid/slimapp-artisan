<template>
  <!-- eslint-disable max-len -->
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre del modelo</h4>
        <label for="name">Nombre del modelo</label>
        <input type="text" class="form-control" id="name" placeholder="Model" required v-model="data.name" @blur="nameModel" v-bind:class="{ 'border border-danger': !data.name }" />
        <br>
        <div class="custom-control custom-checkbox mb-3">
          <input type="checkbox" class="custom-control-input" id="force" v-model="data.force" @change="command">
          <label class="custom-control-label" for="force">Sobreescribir si ya existe la clase?</label>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Opciones de archivos</h4>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="all" v-model="data.all" @change="all">
          <label class="custom-control-label" for="all">Generar una <em>migration</em>, <em class="text-muted">factory</em>, y <em>resource controller</em> para el modelo</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="controller" v-model="data.controller" @change="command">
          <label class="custom-control-label" for="controller">Crear un nuevo <b>controller</b> para el modelo</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="resource" v-model="data.resource" @change="noall">
          <label class="custom-control-label" for="resource">El controlador es un <b>resource controller</b>?</label>
        </div>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="migration" v-model="data.migration" @change="noall">
          <label class="custom-control-label" for="migration">Crear un archivo de <b>migration</b> para el modelo</label>
        </div>
        <!--<div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="factory" v-model="data.factory" @change="noall">
          <label class="custom-control-label" for="factory">Crear una nueva <b>factory</b> para el modelo</label>
        </div>
        -->
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="pivot" v-model="data.pivot" @change="command">
          <label class="custom-control-label" for="pivot">El modelo es una tabla intermedia <b>pivot</b>?</label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 mb-3">
        <h4 class="mb-3">Opciones del Modelo</h4>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="plain" v-model="data.plain" @change="command">
          <label class="custom-control-label" for="plain">Generar modelo plano / No customizable</label>
        </div>
      </div>
      <div class="col-md-8 mb-3">
        <div class="form-group" v-if="!data.plain">
          <label for="table">Nombre de la tabla</label>
          <input type="text" class="form-control" id="table" v-model="data.table" @change="command" />
        </div>
      </div>
    </div>
    <div class="row" v-if="!data.plain">
      <div class="col-md-4 mb-3">
        <h5>Clave Primaria</h5>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="autopk" v-model="data.autopk" @change="command">
          <label class="custom-control-label" for="autopk">Generar automáticamente <em>primarykey</em>, <em>keytype</em> y <em>incrementing</em></label>
        </div>
        <br>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="incrementing" v-model="data.incrementing" @change="command" :disabled="data.autopk">
          <label class="custom-control-label" for="incrementing">Clave autoincremental</label>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="primarykey">Campo Clave Primaria (PK)</label>
          <input type="text" class="form-control" id="table" v-model="data.primarykey" @change="command" :disabled="data.autopk" />
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="keytype">Tipo de campo de PK</label>
          <select type="text" class="form-control" id="keytype" v-model="data.keytype" @change="command" :disabled="data.autopk">
            <option value="int">INTEGER</option>
            <option value="string">STRING</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row" v-if="!data.plain">
      <div class="col-md-4 mb-3">
        <h5>Timestamps</h5>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="soft" v-model="data.soft" @change="command">
          <label class="custom-control-label" for="soft">Usa soft deletes</label>
        </div>
        <br>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="timestamps" v-model="data.timestamps" @change="command">
          <label class="custom-control-label" for="timestamps">Usa campos de tiempo</label>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="created_at">Campo CREATED_AT</label>
          <input type="text" class="form-control" id="created_at" v-model="data.created_at" @change="command" :disabled="!data.timestamps" />
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="updated_at">Campo UPDATED_AT</label>
          <input type="text" class="form-control" id="updated_at" v-model="data.updated_at" @change="command" :disabled="!data.timestamps" />
        </div>
      </div>
    </div>
    <div class="row" v-if="!data.plain">
      <div class="col-md-4 mb-3">
        <h5>Asignación masiva</h5>
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="autofill" v-model="data.autofill" @change="command">
          <label class="custom-control-label" for="autofill">Generar automáticamente <em>fillable</em></label>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="fillable">Lista blanca (<em>fillable</em>)</label>
          <input type="text" class="form-control" id="fillable" v-model="data.fillable" @blur="cleanValueList(data.fillable, 'fillable')" :disabled="data.autofill" />
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="form-group">
          <label for="guarded">Lista negra (<em>guarded</em> * = todos)</label>
          <input type="text" class="form-control" id="guarded" v-model="data.guarded" @blur="cleanValueList(data.guarded, 'guarded')" :disabled="data.autofill" />
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
  name: 'MakeModel',
  props: ['config'],
  data() {
    return {
      data: {
        name: '',
        // Generate a migration, factory, and resource controller for the model
        all: false,
        // Create a new controller for the model
        controller: false,
        // Create a new factory for the model
        factory: false,
        // Create a new migration file for the model
        migration: false,
        // Indicates if the generated model should be a custom intermediate table model
        pivot: false,
        // Indicates if the generated controller should be a resource controller
        resource: false,
        // Create the class even if the model already exists
        force: false,
        // Options Model
        plain: true,
        soft: false,
        autopk: false,
        table: '',
        primarykey: 'id',
        incrementing: true,
        keytype: 'int',
        timestamps: true,
        created_at: 'created_at',
        updated_at: 'updated_at',
        autofill: false,
        fillable: '',
        guarded: '*',
      },
    };
  },
  methods: {
    command() {
      let cmd = '> php artisan make:model ';

      if (this.data.name) {
        cmd += this.data.name;

        if (this.data.all) {
          cmd += ' --all';
        } else {
          if (this.data.migration) {
            cmd += ' --migration';
          }

          if (this.data.controller) {
            cmd += ' --controller';
          }

          if (this.data.resource) {
            cmd += ' --resource';
          }
        }

        if (this.data.pivot) {
          cmd += ' --pivot';
        }

        if (this.data.force) {
          cmd += ' --force';
        }

        if (!this.data.plain) {
          if (this.data.table) {
            cmd += ` --table=${this.data.table}`;
          }

          if (this.data.autopk) {
            cmd += ' --autopk';
          } else {
            if (this.data.primarykey !== 'id') {
              cmd += ` --pk=${this.data.primarykey}`;
            }

            if (!this.data.incrementing) {
              cmd += ' --no-incrementing';
            }

            if (this.data.keytype !== 'int') {
              cmd += ` --keytype=${this.data.keytype}`;
            }
          }

          if (!this.data.timestamps) {
            cmd += ' --no-timestamps';
          } else {
            if (this.data.created_at !== 'created_at') {
              cmd += ` --created_at=${this.data.created_at}`;
            }

            if (this.data.updated_at !== 'updated_at') {
              cmd += ` --updated_at=${this.data.updated_at}`;
            }
          }

          if (this.data.soft) {
            cmd += ' --soft';
          }

          if (this.data.autofill) {
            cmd += ' --autofill';
          } else {
            if (this.data.fillable) {
              cmd += ` --fillable=${this.data.fillable}`;
            } else {
              if (this.data.guarded !== '*') {
                cmd += ` --guarded=${this.data.guarded}`;
              }
            }
          }
        }
      }

      this.$parent.addCommand(cmd);
    },
    submit() {
      if (!this.data.name) {
        return;
      }
      this.command();
      this.$parent.send('make/model', this.data, this.$parent.fetchModels);
    },
    nameModel() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, '');
      this.command();
    },
    all() {
      if (this.data.all) {
        this.data.controller = true;
        // this.data.factory = true; //no implementado
        this.data.migration = true;
        this.data.resource = true;
      }
      this.command();
    },
    noall() {
      if (this.data.resource === false || this.data.migration === false) {
        // || this.data.factory === false
        this.data.all = false;
      } else {
        this.data.all = true;
        this.data.controller = true;
      }
      this.command();
    },
    cleanValueList(value, list) {
      if (list === 'fillable') {
        if (value) {
          value = this.cleanValue(value);
        }
        this.data.fillable = value;
      } else if (list === 'guarded') {
        if (value && value !== '*') {
          value = this.cleanValue(value);
        }
        this.data.guarded = value;
      }
      this.command();
    },
    cleanValue(value) {
      value = value.toLowerCase().replace(/[\s]|'|"/g, '').replace(/-/g, '_');

      if (!value) return value;

      value = value.split(',').join("', '");
      return `'${value}'`;
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
