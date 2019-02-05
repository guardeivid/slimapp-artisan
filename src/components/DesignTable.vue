<template>
  <!-- eslint-disable max-len -->
  <div class="row">
    <div class="tabs">
      <div class="tabs">
        <a @click="tab=1" :class="{'active': tab === 1 }">Fields</a>
        <a @click="tab=2" :class="{'active': tab === 2 }">Indexes</a>
        <a @click="tab=3" :class="{'active': tab === 3 }">Foreign Keys</a>
        <div v-if="tab === 1" class="btns">
          <button @click="add('fields', fields.length);" type="button" class="btn btn-outline-success btn-sm"><fa-icon icon="plus-circle"/> Add Field</button>
          <button @click="add('fields', table[0].rowactive);" type="button" class="btn btn-outline-warning btn-sm"><fa-icon icon="plus"/> Insert Field</button>
          <button @click="remove('fields', 0, table[0].rowactive);" type="button" class="btn btn-outline-danger btn-sm"><fa-icon icon="minus-circle"/> Delete Field</button>
        </div>
        <div v-if="tab === 2" class="btns">
          <button @click="add('indexes', indexes.length);" type="button" class="btn btn-outline-success btn-sm"><fa-icon icon="plus-circle"/> Add Index</button>
          <button @click="remove('indexes', 1, table[1].rowactive);" type="button" class="btn btn-outline-danger btn-sm"><fa-icon icon="minus-circle"/> Delete Index</button>
        </div>
        <div v-if="tab === 3" class="btns">
          <button @click="add('foreigns', foreigns.length);" type="button" class="btn btn-outline-success btn-sm"><fa-icon icon="plus-circle"/> Add Foreign</button>
          <button @click="remove('foreigns', 2, table[2].rowactive);" type="button" class="btn btn-outline-danger btn-sm"><fa-icon icon="minus-circle"/> Delete Foreign</button>
        </div>
      </div>
      <div class="content">
        <div class="col-md mb-3 tabcontent" v-if="tab == 1">
          <div class="table-responsive ">
            <table class="table table-sm table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Length</th>
                  <th>Decimals</th>
                  <th>Allow Null</th>
                  <th>Primary Key</th>
                  <!--<th></th>
                  <th>Comment</th>-->
                </tr>
              </thead>
              <tbody v-if="fields.length">
                <tr v-for="(field, index) in fields" :key="index" @click="focus('fields', 0, field, index)">
                  <td>
                    <fa-icon icon="caret-right" class="rowactive" v-if="index === table[0].rowactive"/>
                  </td>
                  <td>
                    <input
                      :id="'field_'+index" type="text" required
                      class="form-control form-control-sm material"
                      :class="{ 'border border-danger': !field.name && !field.isfun }"
                      v-model="field.name"
                      @change="setValid('fields', field)"
                      :disabled="field.isfun" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm material" required v-model="field.type" @change="fieldType(field)">
                      <option v-for="type in types" :key="type" :value="type">
                        {{ type }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm material" v-model="field.total" min="0" @change="command">
                  </td>
                  <td>
                    <input type="number" class="form-control form-control-sm material" v-model="field.decimal" min="0" @change="command">
                  </td>
                  <td>
                    <div class="custom-control custom-checkbox mb-3 ml-2">
                      <input type="checkbox" class="custom-control-input" v-model="field.nullable" @change="command" :id="`nullable_${index}`" :disabled="field.isnull">
                      <label class="custom-control-label" :for="`nullable_${index}`"> </label>
                    </div>
                  </td>
                  <td>
                    <div class="custom-control custom-checkbox mb-3 ml-2">
                      <input type="checkbox" class="custom-control-input" v-model="field.pk" @change="command" :id="`pk_${index}`" :disabled="!field.ispk">
                      <label class="custom-control-label" :for="`pk_${index}`"> </label>
                    </div>
                  </td>
                  <!--<td>
                    <input type="text" class="form-control form-control-sm" v-model="field.default" @change="command">
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm" v-model="field.comment" @change="command">
                  </td>-->
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group row">
                  <label for="inputdefault" class="col-sm-3 col-form-label">Default</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control form-control-sm" id="inputdefault" v-model="options.default" @change="updateOptions">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="custom-control custom-checkbox mb-3 ml-2">
                  <input type="checkbox" class="custom-control-input" v-model="options.autoincrement"  @change="updateOptions" id="inputautoincrement" :disabled="!isauto">
                  <label class="custom-control-label" for="inputautoincrement"> Auto-incrementing
                  </label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="form-group row">
                  <label for="inputcomment" class="col-sm-3 col-form-label">Comment</label>
                  <div class="col-sm-9">
                    <input type="text" class="form-control form-control-sm" id="inputcomment" v-model="options.comment" @change="updateOptions">
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="custom-control custom-checkbox mb-3 ml-2">
                  <input type="checkbox" class="custom-control-input" v-model="options.unsigned"  @change="updateOptions" id="inputunsigned" :disabled="!isunsign">
                  <label class="custom-control-label" for="inputunsigned"> Unsigned
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md mb-3 tabcontent" v-if="tab == 2">
          <div class="table-responsive ">
            <table class="table table-sm table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th>Name (Optional)</th>
                  <th>Fields</th>
                  <th>Index Type</th>
                </tr>
              </thead>
              <tbody v-if="indexes.length">
                <tr v-for="(field, index) in indexes" :key="index" @click="focus('indexes', 1, field, index)">
                  <td>
                    <fa-icon icon="caret-right" class="rowactive" v-if="index === table[1].rowactive"/>
                  </td>
                  <td>
                    <input :id="'index_'+index" type="text" class="form-control form-control-sm material" v-model="field.name" @change="command" />
                  </td>
                  <td>
                    <design-field :fields="fields" :field.sync="field.fields" @setValid="setValid('indexes', field)">
                    </design-field>
                  </td>
                  <td>
                    <select class="form-control form-control-sm material" required v-model="field.type" @change="command">
                      <option v-for="type in indexTypes" :key="type" :value="type">
                        {{ type }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="col-md mb-3 tabcontent" v-if="tab == 3">
          <div class="table-responsive ">
            <table class="table table-sm table-borderless">
              <thead>
                <tr>
                  <th></th>
                  <th>Name (Optional)</th>
                  <th>Fields</th>
                  <th>Referenced Table</th>
                  <th>Referenced Fields</th>
                  <th>On Delete</th>
                  <th>On Update</th>
                </tr>
              </thead>
              <tbody v-if="foreigns.length">
                <tr v-for="(field, index) in foreigns" :key="index" @click="focus('foreigns', 2, field, index)">
                  <td>
                    <fa-icon icon="caret-right" class="rowactive" v-if="index === table[2].rowactive"/>
                  </td>
                  <td>
                    <input :id="'foreign_'+index" type="text" class="form-control form-control-sm material" v-model="field.name" @change="command" />
                  </td>
                  <td>
                    <design-field :fields="fields" :field.sync="field.fields" @setValid="setValid('foreigns', field)">
                    </design-field>
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm material" required v-model="field.reftable" @change="setValid('foreigns', field)" :class="{ 'border border-danger': !field.reftable }" />
                  </td>
                  <td>
                    <input type="text" class="form-control form-control-sm material" required v-model="field.reffields" @change="setValid('foreigns', field)" :class="{ 'border border-danger': !field.reffields }" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm material" v-model="field.ondelete" @change="command">
                      <option></option>
                      <option v-for="action in actions" :key="action" :value="action">
                        {{ action }}
                      </option>
                    </select>
                  </td>
                  <td>
                    <select class="form-control form-control-sm material" v-model="field.onupdate" @change="command">
                      <option></option>
                      <option v-for="action in actions" :key="action" :value="action">
                        {{ action }}
                      </option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
import DesignField from '@/components/DesignFields';

export default {
  name: 'DesignTable',
  components: {
    DesignField,
  },
  props: ['fields', 'options', 'indexes', 'foreigns'],
  data() {
    return {
      types: [
        'bigIncrements', // Auto-incrementing UNSIGNED BIGINT (primary key)
        'bigInteger', // BIGINT
        'binary', // BLOB
        'boolean', // BOOLEAN
        'char', // CHAR with an optional length
        'date', // DATE
        'dateTime', // DATETIME
        'dateTimeTz', // DATETIME (with timezone)
        'decimal', // DECIMAL total, digits
        'double', // DOUBLE total, digits
        'enum', // ENUM
        'float', // FLOAT total, digits
        'geometry', // GEOMETRY
        'geometryCollection', // GEOMETRYCOLLECTION
        'increments', // Auto-incrementing UNSIGNED INTEGER (primary key)
        'integer', // INTEGER
        'ipAddress', // IP address
        'json', // JSON
        'jsonb', // JSONB
        'lineString', // LINESTRING
        'longText', // LONGTEXT
        'macAddress', // MAC address
        'mediumIncrements', // Auto-incrementing UNSIGNED MEDIUMINT (primary key)
        'mediumInteger', // MEDIUMINT
        'mediumText', // MEDIUMTEXT
        'morphs', // Adds taggable_id UNSIGNED BIGINT and  taggable_type VARCHAR
        'multiLineString', // MULTILINESTRING
        'multiPoint', // MULTIPOINT
        'multiPolygon', // MULTIPOLYGON
        'nullableMorphs', // Adds nullable versions of  morphs()
        'nullableTimestamps', // Alias of timestamps()
        'point', // POINT
        'polygon', // POLYGON
        'rememberToken', // Adds a nullable  remember_token VARCHAR(100)
        'smallIncrements', // Auto-incrementing UNSIGNED SMALLINT (primary key)
        'smallInteger', // SMALLINT
        'softDeletes', // Adds a nullable  deleted_at TIMESTAMP
        'softDeletesTz', // Adds a nullable  deleted_at TIMESTAMP (with timezone)
        'string', // VARCHAR with a optional length
        'text', // TEXT
        'time', // TIME
        'timeTz', // TIME (with timezone)
        'timestamp', // TIMESTAMP
        'timestampTz', // TIMESTAMP (with timezone)
        'timestamps', // Adds nullable  created_at and  updated_at TIMESTAMP
        'timestampsTz', // Adds nullable  created_at and  updated_at TIMESTAMP (with timezone)
        'tinyIncrements', // Auto-incrementing UNSIGNED TINYINT (primary key)
        'tinyInteger', // TINYINT
        'unsignedBigInteger', // UNSIGNED BIGINT
        'unsignedDecimal', // UNSIGNED DECIMAL total, digits
        'unsignedInteger', // UNSIGNED INTEGER
        'unsignedMediumInteger', // UNSIGNED MEDIUMINT
        'unsignedSmallInteger', // UNSIGNED SMALLINT
        'unsignedTinyInteger', // UNSIGNED TINYINT
        'uuid', // UUID
        'year', // YEAR
      ],
      tab: 1,
      table: [
        { rowactive: 0 },
        { rowactive: 0 },
        { rowactive: 0 },
      ],
      isauto: false,
      isunsign: false,
      fieldvalidate: false,
      indexTypes: ['primary', 'unique', 'index', 'spatialIndex'],
      indexvalidate: false,
      actions: ['restrict', 'no action', 'cascade', 'set null', 'set default'],
      foreignvalidate: false,
    };
  },
  methods: {
    command() {
      this.$parent.command();
    },
    fieldType(field) {
      field.ispk = true;
      field.isfun = false;
      field.isnull = false;
      this.isunsign = false;
      this.isauto = false;
      if (this.isIncrements(field.type)) {
        field.default = '';
        field.unsigned = true;
        field.autoincrement = true;
        field.pk = true;
        field.ispk = false;
        field.nullable = false;
        field.isnull = true;
      } else if (this.isUnsigned(field.type)) {
        field.unsigned = true;
        field.autoincrement = false;
        field.pk = false;
        this.isauto = true;
      } else if (this.isNumber(field.type)) {
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
        this.isauto = true;
        this.isunsign = true;
      } else if (this.isDate(field.type)) {
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
      } else if (this.isFunctions(field.type)) {
        field.name = '';
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
        field.ispk = false;
        field.isfun = true;
        field.valid = true;
        this.fieldvalidate = true;
      } else if (this.isGeometry(field.type)) {
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
      } else if (field.type === 'enum') {
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
        field.ispk = false;
      } else {
        field.unsigned = false;
        field.autoincrement = false;
        field.pk = false;
      }
      const idx = this.table[0].rowactive;
      this.focus('fields', 0, field, idx, true);

      this.command();
    },
    isFunctions(type) {
      const functions = ['morphs', 'nullableMorphs', 'nullableTimestamps', 'rememberToken', 'softDeletes', 'softDeletesTz', 'timestamps', 'timestampsTz'];
      return functions.indexOf(type) !== -1;
    },
    isDate(type) {
      const dates = ['date', 'dateTime', 'dateTimeTz', 'time', 'timeTz', 'timestamp', 'timestampTz', 'year'];
      return dates.indexOf(type) !== -1;
    },
    isIncrements(type) {
      const increments = ['bigIncrements', 'increments', 'mediumIncrements', 'smallIncrements', 'tinyIncrements'];
      return increments.indexOf(type) !== -1;
    },
    isGeometry(type) {
      const geometries = ['geometry', 'geometryCollection', 'lineString', 'multiLineString', 'multiPoint', 'point', 'polygon'];
      return geometries.indexOf(type) !== -1;
    },
    isUnsigned(type) {
      const unsigneds = ['unsignedBigInteger', 'unsignedDecimal', 'unsignedInteger', 'unsignedMediumInteger', 'unsignedSmallInteger', 'unsignedTinyInteger'];
      return unsigneds.indexOf(type) !== -1;
    },
    isNumber(type) {
      const numbers = ['bigInteger', 'decimal', 'double', 'float', 'integer', 'mediumInteger', 'smallInteger', 'tinyInteger'];
      return numbers.indexOf(type) !== -1;
    },
    isDecimal(type) {
      const numbers = ['decimal', 'double', 'float'];
      return numbers.indexOf(type) !== -1;
    },
    updateOptions() {
      this.$emit('updateOtionsParent');
      this.command();
    },
    focus(type, tid, field, index, silent) {
      const prev = this.table[tid].rowactive;
      if (prev !== index && prev !== 0 && this[type].length > prev && !this[type][prev].valid) {
        this.remove(type, tid, prev);
      }

      if (prev !== index || silent) {
        if (type === 'fields') {
          const opt = {
            index,
            pk: field.pk,
            default: field.default,
            comment: field.comment,
            unsigned: field.unsigned,
            autoincrement: field.autoincrement,
          };
          this.$emit('update:options', opt);
        }

        this.table[tid].rowactive = index;
      }
    },
    remove(type, tid, idx) {
      this[type].splice(idx, 1);
      this.setValid(type);

      const nidx = idx > 0 ? idx - 1 : 0;

      if (this[type].length === 0) {
        const self = this;
        setTimeout(() => {
          self.add(type, 0);
        }, 10);
      } else {
        this.focus(type, tid, this[type][nidx], nidx);
        this.command();
      }
    },
    add(type, idx) {
      const self = this;
      const [name, props] = this.get(type);
      let add = false;
      if (this[`${name}validate`]) {
        this[type].splice(idx, 0, props);
        this[`${name}validate`] = false;
        add = true;
      }

      setTimeout(() => {
        if (!add) {
          idx = (self[type].length > 0) ? self[type].length - 1 : 0;
        }
        const id = `${name}_${idx}`;
        const el = document.getElementById(id);

        if (el) {
          el.click();
          el.focus();
        }
        self.command();
      }, 100);
    },
    setValid(type, field) {
      if (field) {
        if (type === 'fields') {
          field.valid = field.name !== '';
        } else if (type === 'indexes') {
          field.valid = field.fields !== '';
        } else if (type === 'foreigns') {
          field.valid = field.fields !== '' && field.reftable !== '' && field.reffields !== '';
        }
      }
      const [name, props] = this.get(type);
      this[`${name}validate`] = true;
      this.command();
    },
    get(type) {
      let props;
      let name;
      switch (type) {
        case 'fields':
          name = 'field';
          props = {
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
          };
          break;
        case 'indexes':
          name = 'index';
          props = {
            name: '',
            fields: '',
            type: 'index',
            valid: false,
          };
          break;
        case 'foreigns':
          name = 'foreign';
          props = {
            name: '',
            fields: '',
            reftable: '',
            reffields: '',
            ondelete: '',
            onupdate: '',
            valid: false,
          };
          break;

        // no default
      }
      return [name, props];
    },
  },
};
</script>

<style scoped>
  .table-sm td, .table-sm th {
    padding: 0 .1rem;
  }

  .rowactive {
    color: #007bff;
    font-size: 20px;
  }

  /* STYLING */
  .container {
    max-width: 620px;
    min-width: 420px;
    margin: 40px auto;
    color: #888;
  }

  /* Style the tabs */
  .tabs {
    overflow: hidden;
    margin-left: 20px;
    margin-bottom: -2px;
    width: 100%;
  }

  .tabs ul {
    list-style-type: none;
    margin-left: 20px;
  }

  .tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    -webkit-transition: background-color 0.2s;
    transition: background-color 0.2s;
    background-color: #fff;
  }

  /* Change background color of tabs on hover */
  .tabs a:hover {
    background-color: #f1f1f1;
  }

  /* Styling for active tab */
  .tabs a.active {
    border-bottom: 2px solid #fff;
    cursor: default;
    background-color: #f1f1f1;
    color: #007bff;
    font-weight: 700;
  }

  .btns {
    float: right;
    position: relative;
    right: 25px;
  }

  /* Style the tab content */
  .tabcontent {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 3px 3px 6px #e1e1e1
  }

  .material {
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .material:focus {
    border-bottom: 2px solid #007bff;
    box-shadow: none;
  }

  .material.border {
    border: none !important;
    border-bottom: 2px solid #dc3545 !important;
  }

  svg.rowactive.svg-inline--fa {
    vertical-align: middle;
  }
</style>
