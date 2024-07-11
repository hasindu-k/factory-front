<template>
    <div class="modal">
      <div class="modal-content">
        <h2>Payment Details for {{ productName }}</h2>
        <form @submit.prevent="processPayment">
        <!-- Payment fields -->
        <div class="form-group">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" v-model.number="cardNumber" placeholder="Enter card number" min="0" pattern="\d{16}" title="Please enter 16 digits" required>
        </div>
        <div class="form-group">
          <label for="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YYYY" required>
        </div>
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" v-model="cvv" placeholder="Enter CVV" required>
        </div>
        <!-- Submit button -->
        <button type="submit" class="btn btn-primary">Submit Payment</button>
      </form>
      <button @click="closeModal">Close</button>

      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      productName: {
        type: String,
        required: true,
      },
      // Add other payment-related props if needed
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
     position: fixed;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background-color: rgba(0, 0, 0, 0.5);
     display: flex;
     justify-content: center;
     align-items: center;
   }
   
   .modal-content {
     background-color: #fefefe;
     padding: 20px;
     border-radius: 8px;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
     width: 50%;
   }
   
   button {
     margin-top: 10px;
     padding: 8px 16px;
     border: none;
     border-radius: 4px;
     cursor: pointer;
     background-color: #007bff;
     color: #fff;
     transition: background-color 0.3s ease;
   }
   
   button:hover {
     background-color: #0056b3;
   }
   .payment-details {
     max-width: 400px;
     margin: 0 auto;
     padding: 20px;
     border: 1px solid #ccc;
     border-radius: 8px;
   }
   
   .form-group {
     margin-bottom: 20px;
   }
   
   label {
     display: block;
     font-weight: bold;
   }
   
   input[type="text"] {
     width: 90%;
     padding: 10px;
     border: 1px solid #ccc;
     border-radius: 4px;
   }
   
   .btn {
     padding: 10px 20px;
     background-color: #6c63ff;
     color: #fff;
     border: none;
     border-radius: 4px;
     cursor: pointer;
   }
   
   .btn-primary:hover {
     background-color: #5248ff;
   }
   </style>
   