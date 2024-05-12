<template>
  <PageHeader/>
  <div class="background-container">
    <div class="dashboard-box">
      <h1 class="header">Hello Delivery Manager !</h1>
      <div class="section">
        <button @click="goToAddDriver" class="button green-button">
          Add Driver
        </button>
        <button @click="goToAddDelivery" class="button green-button">
          Add Delivery
        </button>
      </div>
    </div>
  </div>
  <!-- <PageFooter/> -->
</template>

<script>
import PageHeader from "./PageHeaderManager.vue";

export default {
  components: {
    PageHeader,
  },
  methods: {
    goToAddDriver() {
      // addDriver page
      this.$router.push("/add-driver-form");
    },
    goToAddDelivery() {
      //  addDelivery page
      this.$router.push("/add-delivery-form");
    },
  },
};
</script>

<style scoped>
.background-container {
  background-image: url('../assets/teaaa.jpg'); 
  background-size: cover; /* Cover the entire container */
  background-position: center; /* Center the background image */
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dashboard-box {
  background-color: rgba(
    255,
    255,
    255,
    0.9
  ); /* Transparent white background color */
  padding: 50px; /* Add padding for spacing */
  border-radius: 20px; /* Add rounded corners */

  /* justify-content: center; */
  /* align-items: center;  */
  height: 30vh;
  width: 50%;
}

.header {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: left;
}

.section {
  display: flex;
  gap: 20px;
  justify-content: center; /* Center the buttons horizontally */
}

.button {
  padding: 15px 20px; /* Increased padding */
  font-size: 16px;
  background-color: #4caf50; /* Dark green background color */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px; /* Add margin to push down */
}

.button:hover {
  background-color: #388e3c; /* Dark green hover color */
}
</style>
