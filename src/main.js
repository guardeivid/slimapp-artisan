import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vue from 'vue';
import App from './App';
import router from './router';

library.add(faCaretRight, faPlus);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#main',
  router,
  // delimiters: ['${', '}'],
  render: h => h(App),
});
