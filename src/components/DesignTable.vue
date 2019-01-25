<template>
  <div class="row">
    <div class="col-md mb-3">
      <table class="table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Type</th>
            <th>Length</th>
            <th>Decimals</th>
            <th>Not Null</th>
            <th>Primary Key</th>
            <th>Default</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody v-if="table.length">
          <tr v-for="row in table" :key="row">
            <td>
              <input type="text" class="form-control" required v-model="row.field" v-bind:class="{ 'border border-danger': !row.field }" @change="command">
            </td>
            <td>
              <select class="form-control" required v-model="row.type" @change="command">
                <option></option>
                <option v-for="type in types" :key="type" v-bind:value="type">{{ type }}</option>
              </select>
            </td>
            <td>
              <input type="number" class="form-control" v-model="row.total" min="0" @change="command">
            </td>
            <td>
              <input type="number" class="form-control" v-model="row.decimals" min="0" @change="command">
            </td>
            <td>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" v-model="row.notnull" @change="command">
              </div>
            </td>
            <td>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" v-model="row.pk" @change="command">
              </div>
            </td>
            <td>
              <input type="text" class="form-control" required v-model="row.default" @change="command">
            </td>
            <td>
              <input type="text" class="form-control" required v-model="row.comment" @change="command">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignTable',
  data() {
    return {
      table: [],
      types: [
        'bigIncrements',  //  Auto-incrementing UNSIGNED BIGINT (primary key)
        'bigInteger', //BIGINT
        'binary',   //BLOB
        'boolean',  //BOOLEAN
        'char',   //CHAR with an optional length
        'date',   //DATE
        'dateTime', //DATETIME
        'dateTimeTz', //DATETIME (with timezone)
        'decimal', //DECIMAL total, digits
        'double', //DOUBLE total, digits
        'enum', //ENUM
        'float',  //FLOAT total, digits
        'geometry', //GEOMETRY
        'geometryCollection', //GEOMETRYCOLLECTION
        'increments', //Auto-incrementing UNSIGNED INTEGER (primary key)
        'integer',    //INTEGER
        'ipAddress',  //IP address
        'json',     //JSON
        'jsonb',    //JSONB
        'lineString', //LINESTRING
        'longText', //LONGTEXT
        'macAddress', //MAC address
        'mediumIncrements', //Auto-incrementing UNSIGNED MEDIUMINT (primary key)
        'mediumInteger',  //MEDIUMINT
        'mediumText', //MEDIUMTEXT
        'morphs', //Adds taggable_id UNSIGNED BIGINT and  taggable_type VARCHAR
        'multiLineString',  //MULTILINESTRING
        'multiPoint', //MULTIPOINT
        'multiPolygon', //MULTIPOLYGON
        'nullableMorphs', //Adds nullable versions of  morphs()
        'nullableTimestamps', //Alias of timestamps()
        'point',    //POINT
        'polygon',  //POLYGON
        'rememberToken',  //Adds a nullable  remember_token VARCHAR(100)
        'smallIncrements',  //Auto-incrementing UNSIGNED SMALLINT (primary key)
        'smallInteger', //SMALLINT
        'softDeletes',  //Adds a nullable  deleted_at TIMESTAMP
        'softDeletesTz',  //Adds a nullable  deleted_at TIMESTAMP (with timezone)
        'string', //VARCHAR with a optional length
        'text',   //TEXT
        'time',   //TIME
        'timeTz', //TIME (with timezone)
        'timestamp', //TIMESTAMP
        'timestampTz', //TIMESTAMP (with timezone)
        'timestamps', //Adds nullable  created_at and  updated_at TIMESTAMP
        'timestampsTz', //Adds nullable  created_at and  updated_at TIMESTAMP (with timezone)
        'tinyIncrements', //Auto-incrementing UNSIGNED TINYINT (primary key)
        'tinyInteger',  //TINYINT
        'unsignedBigInteger',
        //UNSIGNED BIGINT
        'unsignedDecimal',  //UNSIGNED DECIMAL total, digits
        'unsignedInteger',  //UNSIGNED INTEGER
        'unsignedMediumInteger',//UNSIGNED MEDIUMINT
        'unsignedSmallInteger', //UNSIGNED SMALLINT
        'unsignedTinyInteger',  //UNSIGNED TINYINT
        'uuid', //UUID
        'year', //YEAR
      ],
    };
  },
  methods: {
    setStatusRow(row, status) {
      row.status = status;
    },
  },
};
</script>

