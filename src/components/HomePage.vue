<template>
    <div id="app">
      <div class="container mt-3">
        <div class="row">
          <div class="col-md-6">
            <div class="btn-group" role="group">
              <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'HomePage' }" @click="showHome">Home</button>
              <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'ProductList' }" @click="showProductList">Products</button>
              <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'CartList' }" @click="showCartList">Cart</button>
              <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'ManagerList' }" @click="showManagerList">Manager</button>
  
            </div>
          </div>
          
        </div>
  
        <div class="row">
          <div class="col-md-12">
            <component :is="currentComponent">
              <h1 class="mt-4"></h1>
              <h6>You can make any changes to cart</h6>
            </component>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CartList from './Cart/CartList.vue';
  import ProductList from './Products/ProductList.vue';
  import HomePage from './HomePage.vue'; 
  import ManagerList from './ProductManager/ListProduct.vue'
  
  export default {
    data() {
      return {
        currentComponent: 'HomePage',
         searchQuery: '',
        allItems: [], 
        filteredItems: [],
      };
    },
    methods: {
      async showProductList() {
        this.currentComponent = 'ProductList';
         await this.fetchData(); 
        this.filterItems(); 
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
      showHome() {
        this.currentComponent = 'HomePage';
        this.handleNavigation();
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
      HomePage,
      ManagerList
    },
  };
  </script>
  
  <style scoped>
  .btn-primary.active,
  .btn-primary:active,
  .btn-primary:focus {
    background-color: #007bff;
    border-color: #007bff;
  
    overflow: hidden;
    font-family: Arial;
  }
  
  .btn-primary.active a,
  .btn-primary:active a,
  .btn-primary:focus a {
    color: rgb(58, 57, 57);
    text-decoration: none;
  }
  
  .btn-primary:hover,
  .btn-primary.active:hover,
  .btn-primary:active:hover,
  .btn-primary:focus:hover {
    background-color: red;
  }
  .button {
   overflow: hidden;
    background-color: #333;
    font-family: Arial;
  }
  .button a {
    float: left;
    font-size: 16px;
    color: rgba(5, 16, 233, 0.214);
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }
  .button a:hover{
    background-color: red;
  }
  .search-bar input[type=text] {
    
    padding: 6px;
    border: none;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 17px;
  }
  
  
  @media screen and (max-width: 600px) {
    .search-bar input[type=text] {
      float: none;
      display: block;
      text-align: left;
      width: 100%;
      margin: 0;
      padding: 14px;
    }
    .search-bar input[type=text] {
      border: 1px solid #ccc;
    }
  }
  </style>