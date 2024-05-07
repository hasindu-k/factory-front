<template>
    <header class="header-container">
      <div class="logo">
        <img src="../assets/logoUruwala.png" alt="logo" class="logo">
        <!-- <h4>Uruwala Tea Factory</h4> -->
      </div>
      <nav class="nav-links">
        <ul>
          <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'ProductList' }" @click="showProductList">Products</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'fertilizerList' }" @click="showfertilizerList">Fertilizer</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'CartList' }" @click="showCartList">Cart</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'ManagerList' }" @click="showManagerList">Product Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'EmployeeList' }" @click="showEmployeeList">Employee Leave</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'dashboardDelivery' }" @click="showDeliveryList">Delivery</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'feedbackList' }" @click="showFeedbackList">Feedback</button>
        </li>

        </ul>
      </nav>
    </header>
    <ProductList v-if="currentComponent === 'ProductList'" />
  <CartList v-if="currentComponent === 'CartList'" />
  <fertilizerList v-if="currentComponent === 'fertilizerList'" @addFertilizerClicked="navigateToFertilizerList"/>
  <addFertilizer v-if="showAddFertilizer" @addFertilizerClicked="backToFertilizerList" @cancel="backToFertilizerList" style="margin-top: 2%;" />
  <ManagerList v-if="currentComponent === 'ManagerList'" />
  <EmployeeList v-if="currentComponent === 'EmployeeList'" />
  <dashboardDelivery v-if="currentComponent === 'dashboardDelivery'" />
  <feedbackList v-if="currentComponent === 'feedbackList'" />
  </template>
  
  <script>
  import CartList from './Cart/CartList.vue';
import ProductList from './Products/ProductList.vue';
import fertilizerList from './Fertilizer/fertilizerList.vue';
import ManagerList from './ProductManager/ListProduct.vue'
import EmployeeList from './EmployeeLeave/List.vue'
// import DeliveryList from './dashboardDelivery.vue'
import dashboardDelivery from './dashboardDelivery.vue';
import feedbackList from './Feedback/feedbackList.vue';
export default {
  data() {
    return {
      currentComponent: 'ProductList',
      searchQuery: '',
      allItems: [], 
      filteredItems: [],
      showAddFertilizer: false,
    };
  },
  methods: {
    async showProductList() {
     
      this.currentComponent = 'ProductList';
      this.handleNavigation();

    },
    async showCartList() {
      this.currentComponent = 'CartList';
      await this.fetchData(); 
      this.filterItems(); 
    },
    async showManagerList() {
      this.currentComponent = 'ManagerList';
      await this.fetchData(); 
      this.filterItems(); 
    },
    async showEmployeeList() {
      this.currentComponent = 'EmployeeList';
      await this.fetchData(); 
      this.filterItems(); 
    },
    
    async showfertilizerList() {
      this.currentComponent = 'fertilizerList';
      await this.fetchData(); 
      this.filterItems();
    },
    async showDeliveryList() {
      this.currentComponent = 'dashboardDelivery';
      await this.fetchData(); 
      this.filterItems(); 
    },
    async showFeedbackList() {
      this.currentComponent = 'feedbackList';
      await this.fetchData(); 
      this.filterItems(); 
    },

    handleNavigation() {
      this.fetchData();
      this.filterItems(); 
    },
    async handleSearch() {
      this.filterItems();
    },
    async fetchData() {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation
      this.allItems = [];
    },
    filterItems() {
      this.filteredItems = this.allItems.filter(item =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    navigateToFertilizerList() {
      // Handle navigation here
      this.showFertilizerList = false;
      this.showAddFertilizer = true;
    },
    backToFertilizerList(){
      this.showFertilizerList = true;
      this.showAddFertilizer = false;
    }
  },
  components: {
    ProductList,
    CartList,
    fertilizerList,
    ManagerList,
    EmployeeList,
    dashboardDelivery,
    feedbackList
  },
};

  </script>
<style scoped>
.header-container {
  background-color: #2A3925;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  font-size: 1.5rem;
  width: 70px;
  height: 70px;
}

.nav-links ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links ul li {
  display: inline-block;
  margin-right: 10px;
}

.nav-links ul li a {
  color: #ffffff;
  text-decoration: none;
}
</style>
  