<template>
  <header class="header-container">
    <div class="logo">
      <router-link to="/">
        <img src="../assets/logoUruwala.png" alt="logo" class="logo" />
      </router-link>
      <h4 class="company-name">Uruwala Tea Factory</h4>
    </div>
    <nav class="nav-links">
      <ul>
        <li>
          <button
            type="button"
            :class="{
              'btn btn-primary active': currentComponent === 'MenuPage',
            }"
            @click="showMenu"
          >
            Home
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="{
              'btn btn-primary active': currentComponent === 'ProductList',
            }"
            @click="showProductList"
          >
            Products
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="{
              'btn btn-primary active': currentComponent === 'CartList',
            }"
            @click="showCartList"
          >
            Cart
          </button>
        </li>

        <li>
          <button
            type="button"
            :class="{
              'btn btn-primary active': currentComponent === 'feedbackForm',
            }"
            @click="showFeedbackForm"
          >
            Feedback
          </button>
        </li>
        <li>
          <button
            type="button"
            :class="{
              'btn btn-primary active': currentComponent === 'ManagerDashboard',
            }"
            @click="showManagerList"
          >
            Login
          </button>
        </li>
      </ul>
    </nav>
  </header>
  <!-- <ManagerDashboard v-if="currentComponent === 'ManagerDashboard'" />
  <ProductList v-if="currentComponent === 'ProductList'" />
  <CartList v-if="currentComponent === 'CartList'" />
  <feedbackForm v-if="currentComponent === 'feedbackForm'" /> -->
</template>

<script>
// import ManagerDashboard from './ManagerDashBoard.vue';
// import ProductList from './Products/ProductList.vue';
// import CartList from './Cart/CartList.vue';
// import feedbackForm from './Feedback/addFeedback.vue';
export default {
  data() {
    return {
      currentComponent: "",
      searchQuery: "",
      allItems: [],
      filteredItems: [],
      showAddFertilizer: false,
    };
  },
  methods: {
    async showMenu() {
      this.currentComponent = "MenuPage";
      await this.fetchData();
      this.filterItems();
      this.$router.push("/");
    },

    // async showManagerList() {
    //   this.currentComponent = 'ManagerDashboard';
    //   await this.fetchData();
    //   this.filterItems();
    //   this.$router.push("/manager-dashboard");
    // },

    async showManagerList() {
      this.currentComponent = "ManagerDashboard";
      await this.fetchData();
      this.filterItems();
      this.$router.push("/login");
    },

    async showProductList() {
      this.currentComponent = "ProductList";
      await this.fetchData();
      this.filterItems();
      this.$router.push("/List-Product");
    },

    async showCartList() {
      this.currentComponent = "CartList";
      await this.fetchData();
      this.filterItems();
      this.$router.push("/List-Cart");
    },

    async showFeedbackForm() {
      this.currentComponent = "feedbackForm";
      await this.fetchData();
      this.filterItems();
      this.$router.push("/feedback-form");
    },

    handleNavigation() {
      this.fetchData();
      this.filterItems();
    },

    async handleSearch() {
      this.filterItems();
    },

    async fetchData() {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
      this.allItems = [];
    },

    filterItems() {
      this.filteredItems = this.allItems.filter((item) =>
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
.header-container {
  background-color: #2a3925;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo {
  display: flex;
  align-items: center; /* Align items vertically */
}

.logo img {
  width: 70px;
  height: 70px;
}

.company-name {
  margin-left: 10px; /* Adjust the margin as needed */
  font-size: 14px; /* Set the font size to make it smaller */
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
  border-radius: 8px;
}

.body {
  margin: unset;
}
</style>
