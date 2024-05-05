<template>
  <div class="page-container">
    <PageHeader />

    <div class="background"></div>
    
    <div class="spacer"></div>
    
    <div class="order-update-container">
      <div class="order-update">
        <h2>Update Order</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="supplierID">Supplier ID:</label>
            <input type="number" id="supplierID" v-model="supplierID" required>
          </div>

          <div class="form-group">
            <label for="itemName">Item Name:</label>
            <input type="text" id="itemName" v-model="itemName" required>
          </div>

          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input type="number" id="quantity" v-model="quantity" required>
          </div>

          <div class="form-group">
            <label for="unitPrice">Unit Price:</label>
            <input type="number" id="unitPrice" v-model="unitPrice" required>
          </div>

          <div class="form-group">
            <label for="orderState">Order State :</label>
            <select id="orderState" v-model="orderState" required>
              <option value="">Select order state</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Received">Received</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit">Update Order</button><br><br>

          <button @click="navigateToView">View Details</button>
        </form>
      </div>
    </div>
    <br>
     <!-- Footer Section -->
     <PageFooter/>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';

export default {
  components: {
    PageHeader,
    PageFooter
  },
   data() {
    return {
      supplierID: '',
      itemName: '',
      quantity: 0,
      unitPrice: 0,
      orderState: ''
    };
  },
  mounted() {
    this.orderID = this.$route.params.id;
    this.itemName = this.$route.query.itemName;
    this.quantity = this.$route.query.quantity;
    this.unitPrice = this.$route.query.unitPrice;
    this.orderState = this.$route.query.orderState;
    this.supplierID = this.$route.query.supplierID;
    this.retrieveOrder();
  },
  methods: {
    async retrieveOrder() {
      try {
        const orderID = this.$route.params.id;
        const response = await fetch(`http://localhost:5154/api/Order/${orderID}`);
        if (!response.ok) {
          throw new Error("Failed to retrieve order details");
        }
        const data = await response.json();
        this.itemName = data.itemName;
        this.quantity = data.quantity;
        this.unitPrice = data.unitPrice;
        this.orderState = data.orderState;
        this.supplierID = data.supplierID;
      } catch (error) {
        console.error("Error retrieving order details:", error);
      }
    },
    async submitForm() {
      try {
        const formData = {
          itemName: this.itemName,
          quantity: this.quantity,
          unitPrice: this.unitPrice,
          orderState: this.orderState,
          supplierID: this.supplierID
        };

        const response = await fetch(`http://localhost:5154/api/Order/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to update order");
        }

        alert("Order updated successfully!");

        this.$router.push({ name: 'OrderDetailsTable' });
      } catch (error) {
        console.error("Error updating order:", error);
        alert("Error updating order. Please try again.");
      }
    },
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: 'OrderDetailsTable' });
      } else {
        console.error("Router instance is undefined.");
      }
    }
  }
};
</script>

<style scoped>
.page-container {
  position: relative;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 1120px;
  background-image: url('/src/assets/12.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.8;
}

.spacer {
  height: 50px;
}

.order-update-container {
  justify-content: center;
}

.order-update {
  max-width: 360px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 50px;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #23282e;
}

label {
  display: block;
  margin-bottom: 10px;
  color: #555;
}

input[type="text"],
input[type="number"],
select {
  width: calc(100% - -20px);
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 15px;
  box-sizing: border-box;
}

button[type="submit"] {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: calc(100% - 24px);
}

button[type="submit"]:hover {
  background-color: #0056b3;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: calc(100% - 24px);
}

button:hover {
  background-color: #4CAF50;
}
</style>
