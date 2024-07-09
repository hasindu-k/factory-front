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
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToProductManager' }" @click="navigateToProductManager">Product Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToFertilizerManager' }" @click="navigateToFertilizerManager">Fertilizer Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToSupplierManager' }" @click="navigateToSupplierManager">Supplier Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToDeliveryManager' }" @click="navigateToDeliveryManager">Delivery Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToUserManager' }" @click="navigateToUserManager">User Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToCustomerAffairManager' }" @click="navigateToCustomerAffairManager">Customer Affair Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToPaymentManager' }" @click="navigateToPaymentManager">Payment Manager</button>
        </li>
        <li>
          <button type="button" :class="{ 'btn btn-primary active': currentComponent === 'navigateToEmployeeManager' }" @click="navigateToEmployeeManager">Employee Manager</button>
        </li>
        <li>
          <button type="button" style="background-color: greenyellow;" :class="{ 'btn btn-primary active': currentComponent === 'ManagerDashboard' }" @click="navigateToManageDashboard">Manage Dashboard</button>
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
    navigateToSupplierManager() {
      // this.$router.push({ name: "SupplierForm" });
      this.currentComponent = 'navigateToSupplierManager';
      this.$router.push("/supplier-dashboard");
    },
    navigateToProductManager() {
      this.currentComponent = 'navigateToProductManager';
      this.$router.push("/List-Product-manager"); // Change this to the correct route name
    },
    navigateToFertilizerManager() {
      this.currentComponent = 'navigateToFertilizerManager';
      this.$router.push("/ferilizer-list");
    },
    navigateToDeliveryManager() {
      this.currentComponent = 'navigateToDeliveryManager';
      this.$router.push("/delivery-dashboard");
    },
    navigateToUserManager() {
      this.currentComponent = 'navigateToUserManager';
      this.$router.push("/manager-user"); // Change this to the correct route name
    },
    navigateToCustomerAffairManager() {
      this.currentComponent = 'navigateToCustomerAffairManager';
      this.$router.push("/feedback-list");
    },
    navigateToPaymentManager() {
      this.currentComponent = 'navigateToPaymentManager';
      this.$router.push("/payment-list");
    },
    navigateToEmployeeManager() {
      this.currentComponent = 'navigateToEmployeeManager';
      this.$router.push("/employee-leave-form");
    },
    navigateToManageDashboard() {
      this.currentComponent = 'ManagerDashboard';
      this.$router.push("/manager-dashboard");
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
    navigateToFertilizerList() {
      // Handle navigation here
      this.showFertilizerList = false;
      this.showAddFertilizer = true;
    },
    backToFertilizerList() {
      this.showFertilizerList = true;
      this.showAddFertilizer = false;
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
}

.body {
  margin: unset;
}
</style>
