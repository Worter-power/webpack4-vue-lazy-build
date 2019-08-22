import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import './main.css';
alert(1)
import router from './router';

Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: (c) => {return c(App)}
});