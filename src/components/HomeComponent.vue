<template>
  <!-- eslint-disable max-len -->
  <div class="hello">
    <p class="lead"></p>
    <div class="row">
      <div class="col-md mb-3">
        <h4 class="mb-3">Opciones</h4>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="slim" v-model="slim">
            <label class="custom-control-label" for="slim">Utilizar rutas con formato <b>Slim</b> <em>$app->get(route, closure)</em>
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="fill" v-model="fill">
            <label class="custom-control-label" for="fill">Completar nombres de las clases automáticamente según el tipo?
            </label>
        </div>
        <div class="custom-control custom-checkbox mb-3">
            <input type="checkbox" class="custom-control-input" id="console" v-model="console">
            <label class="custom-control-label" for="console">Mostrar resultados en modo consola (terminal)
            </label>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  props: ['config'],
  data() {
    return {
      slim: this.config.slim,
      fill: this.config.fill,
      console: this.config.console,
    };
  },
  watch: {
    slim() {
      this.$parent.setConfig('slim', this.slim);
    },
    fill() {
      this.$parent.setConfig('fill', this.fill);
    },
    console() {
      this.$parent.setConfig('console', this.console);
    },
  },
};
</script>

<style scoped>
  h4 {
    font-weight: normal;
  }
</style>
