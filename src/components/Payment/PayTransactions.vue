<template>
  <div class="add-paymentTransaction-form">
    <CardDetails v-if="isPopupVisible"/>
    <div class="add-transaction-form">
      <h2>Add Your Transaction Details</h2>
      <div class="form-group">
        <label for="transactionId">Transaction ID:</label>
        <input type="text" class="form-control" id="transactionId" v-model="newTransaction.transactionId">
        <span v-if="customerIdError" class="error">{{ customerIdError }}</span>
      </div>
      <div class="form-group">
        <label for="customerId">Customer ID:</label>
        <input type="text" class="form-control" id="customerId" v-model="newTransaction.customerId">
        <span v-if="customerIdError" class="error">{{ customerIdError }}</span>
      </div>
      <div class="form-group">
        <label for="productId">Product ID:</label>
        <input type="text" class="form-control" id="productId" v-model="newTransaction.productId">
        <span v-if="productIdError" class="error">{{ productIdError }}</span>
      </div>
      <div class="form-group">
        <label for="paymentMethod">Payment Method:</label>
        <select class="form-control" id="paymentMethod" v-model="newTransaction.paymentMethod">
          <option value="card">Card</option>
          <option value="loyalty points">Loyalty Points</option>
        </select>
        <span v-if="paymentMethodError" class="error">{{ paymentMethodError }}</span>
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input type="text" class="form-control" id="amount" v-model="newTransaction.amount">
        <span v-if="amountError" class="error">{{ amountError }}</span>
      </div>

      <div class="button-group">
        <button class="btn btn-primary submit-button" @click="openCardForm">Add Transaction</button>
      </div>
    </div>
  </div>


  <div v-if="isPopupVisible" class="payment-form">
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
        <button type="submit" class="btn btn-primary" @click="addTransaction">Submit Payment</button>
      </form>
    </div>


</template>

<script>
import CardDetails from './CardPay.vue';

export default {
  component: {
    CardDetails
  },

  data() {
    return {
      add: false,
      isPopupVisible: false,
      newTransaction: {
        transactionId: '',
        customerId: '',
        productId: '',
        paymentMethod: 'card', // Default payment method
        amount: ''
      },
      customerIdError: '',
      productIdError: '',
      paymentMethodError: '',
      amountError: ''
    };
  },
  methods: {
    //   async submitFormData(formData) {
    // try {
    //   // Update the API endpoint URL based on your backend implementation
    //   const response = await fetch("http://localhost:5154/api/Payment/CreatePayment", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   if (!response.ok) {
    //     throw new Error(Failed to add transaction. Status: ${response.status});
    //   }

    //   console.log(response);
    //   // Display success alert (optional)
    //   alert("Transaction added successfully!");

    //   // Reset form fields after successful submission (optional)
    //   // this.resetFormFields();

    //   // Additional actions after successful submission (optional)
    //   // - Update transaction list
    //   // - Redirect to a different page

    // } catch (error) {
    //   console.error("Error adding transaction:", error);
    //   // Display error alert
    //   alert("Error adding transaction. Please try again.");
    // }
    openCardForm() {
      this.isPopupVisible = true;
    },

    Transactionclick() {
      this.isPopupVisible = true;
      this.addTransaction();
      console.log(this.isPopupVisible + " anna panna");
    },

    addTransaction() {
      const newTransactionData = {
        transactionId: this.newTransaction.transactionId,
        customerId: this.newTransaction.customerId,
        productId: this.newTransaction.productId,
        paymentMethod: this.newTransaction.paymentMethod,
        amount: this.newTransaction.amount

      };
      fetch("http://localhost:5154/api/Payment/CreatePayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransactionData)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to add transaction. Status: ${response.status}');
          } else {
            this.add = true;
            this.fetchTransactionDetails();
          }
          return response.json();
        })

        .then((newTransaction) => {
          this.transactions.push(newTransaction);
          this.newTransaction = {
            transactionId: "",
            customerId: "",
            productId: "",
            paymentMethod: "",
            amount: 0,

          };
          this.isPopupVisible = false;
        })

        .catch((error) => {
          console.error("Error adding transaction", error);
        });

    },

  }


  // ... existing submitForm method with validation and logic (replace "..." with the actual implementation)

  // ... other methods
}

</script>

<style scoped>
/* Styles for the payment form */
.add-paymentTransaction-form {
  max-width: 400px;
  margin: 0 auto;
}

/* Styles for form inputs */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Styles for the submit button */
.submit-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
