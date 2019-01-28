<template>
  <!-- eslint-disable max-len -->
  <div class="row">
    <div class="tabs">
      <div class="tabs">
        <a @click="tab=1" :class="{'active': tab === 1 }">Fields</a>
        <a @click="tab=2" :class="{'active': tab === 2 }">Indexes</a>
        <a @click="tab=3" :class="{'active': tab === 3 }">Foreign Keys</a>
        <div v-if="tab === 1" class="btns">
          <button @click="addField" type="button" class="btn btn-outline-success btn-sm"><fa-icon icon="plus"/> Add Field</button>
          <button @click="insertField" type="button" class="btn btn-outline-warning btn-sm"><fa-icon icon="plus"/> Insert Field</button>
          <button @click="deleteField" type="button" class="btn btn-outline-danger btn-sm"><fa-icon icon="plus"/> Delete Field</button>
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
                  <th>Not Null</th>
                  <th>Primary Key</th>
                  <th></th>
                  <!--<th>Comment</th>-->
                </tr>
              </thead>
              <tbody v-if="fields.length">
                <tr v-for="(field, index) in fields" :key="index" @click="focusField(field, index)">
                  <td>
                    <fa-icon icon="caret-right" class="rowactive" v-if="index === table[0].rowactive"/>
                  </td>
                  <td>
                    <input :id="'field_'+index" type="text" class="form-control form-control-sm material" required v-model="field.name" :class="{ 'border border-danger': !field.name }" @change="command" />
                  </td>
                  <td>
                    <select class="form-control form-control-sm material" required v-model="field.type" @change="command">
                      <option></option>
                      <option v-for="type in types" :key="type" v-bind:value="type">
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
                      <input type="checkbox" class="custom-control-input" v-model="field.notnull" @change="command" :id="`notnull_${index}`">
                      <label class="custom-control-label" :for="`notnull_${index}`"> </label>
                    </div>
                  </td>
                  <td>
                    <div class="custom-control custom-checkbox mb-3 ml-2">
                      <input type="checkbox" class="custom-control-input" v-model="field.pk" @change="command" :id="`pk_${index}`">
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
              <label for="inputdefault" class="col-sm-2 col-form-label">Default</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputdefault"
                  v-model="options.default"
                  @change="updateOptions">
              </div>
            </div>
            <div class="row">
              <label for="inputcomment" class="col-sm-2 col-form-label">Comment</label>
              <div class="col-sm-6">
                <input
                  type="text"
                  class="form-control form-control-sm"
                  id="inputcomment"
                  v-model="options.comment"
                  @change="updateOptions">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md mb-3 table-responsive tabcontent" v-if="tab == 2">
          Indexes
        </div>
        <div class="col-md mb-3 table-responsive tabcontent" v-if="tab == 3">
          Foreign Keys
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DesignTable',
  props: ['fields', 'options'],
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
      fieldvalidate: true,
    };
  },
  methods: {
    setStatusRow(row, status) {
      row.status = status;
    },
    command(e) {
      console.log(e);
    },
    focusField(field, index) {
      const opt = {
        index,
        default: field.default,
        comment: field.comment,
        unsigned: field.unsigned,
        autoincrement: field.autoincrement,
      };

      this.table[0].rowactive = index;

      this.$emit('update:options', opt);
    },
    updateOptions() {
      this.$emit('updateOtionsParent');
    },
    addField() {
      if (this.fieldvalidate) {
        this.fields.push({
          name: '',
          type: 'string',
          total: 0,
          decimal: 0,
          notnull: false,
          pk: false,
          default: '',
          comment: '',
          valid: false,
        });

        this.fieldvalidate = false;
      }

      setTimeout(() => {
        const id = `field_${(this.fields.length - 1)}`;
        document.getElementById(id).focus();
      }, 750);

    },
    insertField() {
      console.log(this);
    },
    deleteField() {
      console.log(this);
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
