<template>
  <!-- eslint-disable max-len -->
  <div>
    <div class="input-group mb-3">
      <input type="text" class="form-control form-control-sm material" readonly @click="showModal = true" v-model="field">
      <div class="input-group-append">
        <button class="btn btn-light btn-sm" type="button" @click="showModal = true">...</button>
      </div>
    </div>

    <div v-if="showModal">
      <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-body">
                  <div v-if="fields.length">
                    <div class="custom-control custom-checkbox mb-1 ml-2" v-for="(field, index) in fields" :key="index">
                      <input type="checkbox" class="custom-control-input" v-model="checkedFields" :id="field.name" :value="field.name">
                      <label class="custom-control-label" :for="field.name"> {{ field.name }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" @click="update">Ok</button>
                  <button type="button" class="btn btn-secondary" @click="close">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DesignField',
  props: {
    fields: {
      type: Array,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      checkedFields: [],
    };
  },
  methods: {
    update() {
      this.$emit('update:field', this.checkedFields.join(', '));
      this.$emit('setValid');
      this.showModal = false;
    },
    close() {
      this.checkedFields = this.field.split(', ');
      this.showModal = false;
    },
  },
};
</script>

<style scoped>
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
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

  .form-control:disabled, .form-control[readonly] {
    background-color: #fff;
  }
</style>
