<template>
  <div class="row">
    <div class="col-md mb-3">
      <div v-for="(error, index) in result.error" :key="error" class="mb-1 alert alert-danger alert-dismissible fade show" role="alert">
        {{ error }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div v-for="(info, index) in result.info" :key="info" class="mb-1 alert alert-success alert-dismissible fade show" role="alert">
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
  name: 'ResultController',
  props: ['result'],
  methods: {
    close(el) {
      for(let i in el.path) {
        let node = el.path[i];
        if (node.localName == 'div') {
          node.style.opacity = '0';
          node.style.transition = 'height 350ms ease-in-out, opacity 750ms ease-in-out';
          setTimeout(function(){ node.style.display = 'none' }, 750);
          break;
        }
      }
    },
  },
};
</script>
