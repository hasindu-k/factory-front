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
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'ManagerList' }" @click="showManagerList">Manager</button>
        </li>

        </ul>
      </nav>
    </header>
    <ProductList v-if="currentComponent === 'ProductList'" />
  <CartList v-if="currentComponent === 'CartList'" />
  <fertilizerList v-if="currentComponent === 'fertilizerList'" />
  <ManagerList v-if="currentComponent === 'ManagerList'" />
  </template>
  
  <script>
  import CartList from './Cart/CartList.vue';
import ProductList from './Products/ProductList.vue';
import fertilizerList from './Fertilizer/fertilizerList.vue';
import ManagerList from './ProductManager/ListProduct.vue'

export default {
  data() {
    return {
      currentComponent: 'ProductList',
      searchQuery: '',
      allItems: [], 
      filteredItems: [],
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
    
    async showfertilizerList() {
      this.currentComponent = 'fertilizerList';
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
  },
  components: {
    ProductList,
    CartList,
    fertilizerList,
    ManagerList,
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
  