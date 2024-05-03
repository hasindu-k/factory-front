import Vue from 'vue';
import Router from 'vue-router';
import addFertilizer from './components/addFertilizer.vue';
import fertilizerList from './components/fertilizerList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'addFertilizer',
      component: addFertilizer
    },
    {
      path: '/fertilizerList',
      name: 'fertilizerList',
      component: fertilizerList
    }
  ]
});
