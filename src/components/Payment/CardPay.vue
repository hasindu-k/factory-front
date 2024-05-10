<template>
    <div class="payment-form">
      <h2>Payment Form</h2>
      <form @submit.prevent="processPayment">
        <div class="form-group">
          <label for="cardNumber">Card Number:</label>
          <input type="text" id="cardNumber" v-model="cardNumber" class="form-control" />
        </div>
        <div class="form-group">
          <label for="expiryDate">Expiry Date:</label>
          <input type="text" id="expiryDate" v-model="expiryDate" placeholder="MM/YY" class="form-control" />
        </div>
        <div class="form-group">
          <label for="cvv">CVV:</label>
          <input type="text" id="cvv" v-model="cvv" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Submit Payment</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        cardNumber: '',
        expiryDate: '',
        cvv: ''
      };
    },
    methods: {
      processPayment() {
        // Send payment information to your backend for processing
        const paymentData = {
          cardNumber: this.cardNumber,
          expiryDate: this.expiryDate,
          cvv: this.cvv
        };
        // Example: Send paymentData to your backend using Axios or fetch API
        // axios.post('/process-payment', paymentData)
        //   .then(response => {
        //     console.log(response.data);
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
        // For demonstration purposes, you can simply log the paymentData
        console.log(paymentData);
        // Reset form fields after submission
        this.cardNumber = '';
        this.expiryDate = '';
        this.cvv = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .payment-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    font-weight: bold;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-primary {
    display: block;
    width: 100%;
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  