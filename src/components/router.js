import { createRouter, createWebHistory } from 'vue-router';
import addDriver from './components/driver/addDriver.vue';
import driverList from './components/driver/driverList.vue';
import editDriver from './components/driver/editDriver.vue';
import addDelivery from './components/delivery/addDelivery.vue'; 
import deliveryList from './components/delivery/deliveryList.vue'; 
import editDelivery from './components/delivery/editDelivery.vue';
import driverProfile from './components/driver/driverProfile.vue';
import PageFooter from './components/PageFooter.vue';
import PageHeader from './components/PageHeader.vue'; 
import dashboardDelivery from './components/dashboardDelivery.vue';

const routes = [
  {
    path: '/',
    name: 'dashboardDelivery',
    components: { default: dashboardDelivery, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/add-driver-form',
    name: 'addDriver',
    components: { default: addDriver, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/driver-list',
    name: 'driverList',
    components: { default: driverList, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/driver-update/:id',  
    name: 'editDriver',
    components: { default: editDriver, header: PageHeader, footer: PageFooter },
  }, 
  {
    path: '/add-delivery-form',  
    name: 'addDelivery',
    components: { default: addDelivery, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/delivery-list',  
    name: 'deliveryList',
    components: { default: deliveryList, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/delivery-update/:id',  
    name: 'editDelivery',
    components: { default: editDelivery, header: PageHeader, footer: PageFooter },
  },
  {
    path: '/profile',  
    name: 'driverProfile',
    components: { default: driverProfile, header: PageHeader, footer: PageFooter },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
