<template>
    <div class="transaction-update">
      <h2>Update Transaction</h2>
      <form @submit.prevent="submitForm">
        
        <label for="customerId">Customer ID:</label>
        <input type="text" id="customerId" v-model="customerId" required>
  
        <label for="productId">Product ID:</label>
        <input type="text" id="productId" v-model="productId" required>
  
        <label for="paymentMethod">Payment Method:</label>
        <input type="text" id="paymentMethod" v-model="paymentMethod" required>
  
        <label for="amount">Amount:</label>
        <input type="text" id="amount" v-model="amount" required>
  
        <label for="timestamp">Timestamp:</label>
        <input type="text" id="timestamp" v-model="timestamp" required>
  
        <button type="submit">Update Transaction</button><br><br>
  
        <!-- Navigation button to view details -->
        <button @click="navigateToView">View Details</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        customerId: '',
        productId: '',
        paymentMethod: '',
        amount: '',
        timestamp: ''
      };
    },
    mounted() {
      this.retrieveTransaction();
    },
    methods: {
      async retrieveTransaction() {
        try {
          const transactionID = this.$route.params.id;
  
          const response = await fetch(`http://localhost:5154/api/Transactions/${transactionID}`);
          if (!response.ok) {
            throw new Error("Failed to retrieve transaction details");
          }
  
          const data = await response.json();
          this.customerId = data.CustomerID;
          this.productId = data.ProductID;
          this.paymentMethod = data.PaymentMethod;
          this.amount = data.Amount;
          this.timestamp = data.Timestamp;
        } catch (error) {
          console.error("Error retrieving transaction details:", error);
        }
      },
      async submitForm() {
        try {
          const formData = {
            CustomerID: this.customerId,
            ProductID: this.productId,
            PaymentMethod: this.paymentMethod,
            Amount: this.amount,
            Timestamp: this.timestamp
          };
  
          const response = await fetch(`http://localhost:5154/api/Transactions/${this.$route.params.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error("Failed to update transaction");
          }
  
          alert("Transaction updated successfully!");
          this.$router.push({ name: 'TransactionTable' });
        } catch (error) {
          console.error("Error updating transaction:", error);
          alert("Error updating transaction. Please try again.");
        }
      },
      navigateToView() {
        const router = this.$router;
        if (router) {
          router.push({ name: 'TransactionTable' });
        } else {
          console.error("Router instance is undefined.");
        }
      }
    }
  };
  </script>
  
  
  <style scoped>
  .supplier-update {
    max-width: 400px;
    margin: auto;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;  
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #4CAF50;  
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #555;  
  }
  
  input[type="text"],
  input[type="email"],
  textarea,
  input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc; 
    border-radius: 5px;
    box-sizing: border-box;  
  }
  
  button {
    padding: 10px 20px;
    background-color: #4CAF50;  
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  button:hover {
    background-color: #45a049; 
  }
  
  button[type="submit"] {
    background-color: #007bff;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  
  