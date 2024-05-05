<template>
  <div class="page-container">
    <div class="header">
      <PageHeader/>
      <div class="back-button-container">
  <router-link to="/" class="back-button small">Back to Dashboard</router-link>
</div>
    </div>
    <router-link to="/dashboard" class="back-button small">Back to Dashboard</router-link> 
    <div class="content-container">
      <div class="form-container">
        <div class="order-form">
          <h2>Place Order <i class="fas fa-cart-plus"></i></h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="supplierID">Supplier ID <i class="fas fa-id-badge"></i>:</label>
              <input type="number" id="supplierID" v-model="supplierID" required>
            </div>
            <div class="form-group">
              <label for="itemName">Item Name <i class="fas fa-tag"></i>:</label>
              <input type="text" id="itemName" v-model="itemName" required>
            </div>
            <div class="form-group">
              <div class="form-row">
                <div class="col">
                  <label for="quantity">Quantity <i class="fas fa-boxes"></i>:</label>
                  <input type="number" id="quantity" v-model="quantity" required>
                </div>
                <div class="col">
                  <label for="unitPrice">Unit Price <i class="fas fa-dollar-sign"></i>:</label>
                  <input type="number" id="unitPrice" v-model="unitPrice" required>
                </div>
                <div class="col">
                  <label for="orderState">Order State <i class="fas fa-info-circle"></i>:</label>
                  <select id="orderState" v-model="orderState" required>
                    <option value="">Select order state</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Pending">Pending</option>
                    <option value="Received">Received</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label for="orderDate">Order Date <i class="fas fa-calendar-alt"></i>:</label>
              <input type="date" id="orderDate" v-model="orderDate" required>
            </div>
            <div class="form-group">
              <button @click="navigateToView">Submit <i class="fas fa-eye"></i></button><br><br>
              <button type="submit">Place Order <i class="fas fa-check"></i></button>
              
            </div>
          </form>
        </div>
      </div>
      <div class="image-container"></div>
    </div>
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
      itemName: '',
      quantity: null,
      unitPrice: null,
      orderState: '',
      orderDate: '',
      supplierID: null
    };
  },
  methods: {
    submitForm() {
      this.submitOrder();
    },
    async submitOrder() {
      try {
        const orderData = {
          itemName: this.itemName,
          quantity: this.quantity,
          unitPrice: this.unitPrice,
          orderState: this.orderState,
          orderDate: this.orderDate,
          supplierID: this.supplierID
        };

        const response = await fetch("http://localhost:5154/api/Order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(orderData)
        });

        if (!response.ok) {
          throw new Error(`Failed to place order. Status: ${response.status}`);
        }

        alert("Order placed successfully!");

        this.resetFormFields();
      } catch (error) {
        console.error("Error placing order:", error);
        alert("Error placing order. Please try again.");
      }
    },
    resetFormFields() {
      this.itemName = '';
      this.quantity = null;
      this.unitPrice = null;
      this.orderState = '';
      this.orderDate = '';
      this.supplierID = null;
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
body {
  overflow: hidden;
  margin: 0;
}

.page-container {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100vw;
  height: 100vh;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.content-container {
  display: flex;
  flex: 1;
}

.form-container {
  flex: 0.4;
  padding: 30px;
  background-color: #333;
  color: #fff;
  /* border-radius: 10px; */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.order-form {
  width: 100%;
  background-color: rgba(203, 196, 196, 0.9);
  border-radius: 10px;
  margin: auto;
  padding-bottom: 30px;
}

.image-container {
  flex: 0.65;
  background-image: url('/src/assets/5.png');
  background-size: cover;
  background-position: center;
  /* border-radius: 10px; */
  overflow: hidden;
}

.order-form .form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-form .form-row .col {
  flex: 1;
}

.order-form .form-row .col:not(:last-child) {
  margin-right: 10px;
}

.order-form .form-group {
  margin-bottom: 20px;
}

.order-form label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

.order-form input[type="text"],
.order-form input[type="number"],
.order-form select,
.order-form textarea {
  width: 70%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 100px;
  box-sizing: border-box;
}

.order-form textarea {
  height: 100px;
}

.order-form .error-message {
  color: red;
}

.order-form button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.order-form button:hover {
  background-color: #45a049;
}

.form-group button {
  margin-right: 10px;
}
.back-button {
  padding: 5px 10px;
  font-size: 14px;
  margin: 20px 0;
  align-self: flex-start;
}
.back-button.small {
  padding: 5px 10px;
  font-size: 14px;
}
.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
  margin-left: 1300px;
}

.back-button:hover {
  background-color: #388e3c;
}
</style>
