<template>
  <!-- eslint-disable max-len -->
  <div class="row">
    <div class="col-md mb-3">
      <div id="console" class="row" v-if="result.notes.length">
        <div v-for="note in result.notes" :key="note" v-html="note" class="col-12 mb-1"></div>
      </div>
      <div v-for="(error, index) in result.error" :key="index" class="mb-1 alert alert-danger alert-dismissible fade show" role="alert">
        {{ error }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-for="(info, index) in result.info" :key="index" class="mb-1 alert alert-success alert-dismissible fade show" role="alert">
        {{ info }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Resul',
  props: ['result'],
  methods: {
    close(el) {
      for (const i in el.path) {
        const node = el.path[i];
        if (node.localName === 'div') {
          node.style.opacity = '0';
          node.style.transition = 'height 350ms ease-in-out, opacity 750ms ease-in-out';
          setTimeout(() => { node.style.display = 'none'; }, 750);
          break;
        }
      }
    },
  },
};
</script>

<style>
  #console {
    background-color: #151515;
    color: white;
    /*font-weight: bold;*/
    box-sizing: border-box;
    margin: 0 auto;
    padding: 10px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-family: monospace;
    white-space: normal;
    font-size: 1.2em;
  }

  info {
    color: #4CAF50;
    font-weight: bold;
    display: contents;
  }

  comment {
    color: #FFEB3B;
    font-weight: bold;
    display: contents;
    padding: 2px;
  }

  error {
    color: red;
    display: contents;
    padding: 2px;
    font-weight: bold;
  }

  critical {
    background-color: red;
    font-weight: bold;
    padding: 2px;
    /*display: contents;*/
  }
</style>
