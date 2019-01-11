<template>
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md-6 mb-3">
        <h4 class="mb-3">Nombre de la clase del seeder</h4>
        <label for="name">Nombre de la clase del seeder</label>
        <input type="text" class="form-control" id="name" placeholder="NameSeeder" required v-model="data.name" @blur="NameSeeder" v-bind:class="{ 'border border-danger': !data.name }">
      </div>
      <div class="col-md-6 mb-3 d-flex align-items-end">
        <button class="btn btn-primary btn-lg" type="submit" v-on:click="submit">Ejecutar</button>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
//<pre>{{ $data }}, {{ $props }}</pre>
export default {
  name: 'MakeSeeder',
  props: ['config'],
  data() {
    return {
      data: {
        name: '',
      },
    };
  },
  methods: {
    submit() {
      if (!this.data.name) {
        return;
      }
      this.$parent.send('make/seeder', this.data);
    },
    NameSeeder() {
      if (!this.data.name) {
        return;
      }
      this.data.name = this.$parent.fillName(this.data.name, 'TableSeeder');
    },
  },
};
</script>

<style scoped>
  h1, h2, h4 {
    font-weight: normal;
  }
</style>
