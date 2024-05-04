<template>
    <div class="transaction-details">
      <h2>Transaction Details</h2>
      <div class="detail">
        <strong>Transaction ID:</strong> {{ newTransaction.transactionId }}
      </div>
      <div class="detail">
        <strong>Customer ID:</strong> {{ newTransaction.customerId }}
      </div>
      <div class="detail">
        <strong>Product ID:</strong> {{ newTransaction.productId }}
      </div>
      <div class="detail">
        <strong>Payment Method:</strong> {{ newTransaction.paymentMethod }}
      </div>
      <div class="detail">
        <strong>Amount:</strong> {{ newTransaction.amount }}
      </div>
      <button class="btn btn-primary proceed-button" @click="proceedToShipping">Proceed to Shipping</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      newTransaction: Object // Passed as a prop from the parent component
    },
    methods: {
      proceedToShipping() {
        // Emit an event to notify the parent component to proceed to shipping
        this.$emit('proceedToShipping');
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your styles for transaction details */
  .detail {
    margin-bottom: 10px;
  }
  .proceed-button {
    margin-top: 20px;
  }
  </style>
    