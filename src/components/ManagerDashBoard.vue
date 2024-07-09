<template>
  <div class="header-manager-dashboard">
    <PageHeader />
    <div class="page-container">
      <div class="manager-dashboard">
        <br />
        <h2 style="color: #357007">Manager Dashboard</h2>
        <div class="dashboard-container">
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToProductManager">
              Product Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button
              class="dashboard-button"
              @click="navigateToFertilizerManager"
            >
              Fertilizer Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToDeliveryManager">
              Delivery Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToSupplierManager">
              Supplier Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToUserManager">
              User Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button
              class="dashboard-button"
              @click="navigateToCustomerAffairManager"
            >
              Customer Affair Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToPaymentManager">
              Payment Manager
            </button>
          </div>
          <div class="dashboard-buttons">
            <button class="dashboard-button" @click="navigateToEmployeeManager">
              Employee Manager
            </button>
          </div>
        </div>
        <br />
      </div>
    </div>
    <!-- Footer Section -->
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "./PageHeader.vue";
import PageFooter from "./PageFooter.vue";

export default {
  components: {
    PageHeader,
    PageFooter,
  },
  methods: {
    navigateToSupplierManager() {
      // this.$router.push({ name: "SupplierForm" });
      this.$router.push("/supplier-dashboard");
    },
    navigateToProductManager() {
      this.$router.push("/List-Product-manager"); // Change this to the correct route name
    },
    navigateToFertilizerManager() {
      this.$router.push("/ferilizer-list");
    },
    navigateToDeliveryManager() {
      this.$router.push("/delivery-dashboard");
    },
    navigateToUserManager() {
      this.$router.push("/manager-user"); // Change this to the correct route name
    },
    navigateToCustomerAffairManager() {
      this.$router.push("/delivery-dashboard");
    },
    navigateToPaymentManager() {
      this.$router.push("/payment-list");
    },
    navigateToEmployeeManager() {
      this.$router.push("/employee-leave-form");
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
}
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.manager-dashboard {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/2.png");
  background-size: cover;
  background-position: center;
}

h2 {
  text-align: center;
}

.dashboard-container {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 100px;
}

.dashboard-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.dashboard-button {
  padding: 10px 20px;
  background-color: #357007;
  color: #fff;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  margin: 5px;
  width: 200px;
}

.dashboard-button:hover {
  background-color: #152d03;
}
</style>
