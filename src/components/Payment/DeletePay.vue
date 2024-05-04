<template>
  <div class="payment-form">
    <h2>Submit Payment</h2>
    <form @submit.prevent="submitPayment">
      <div>
        <input type="radio" id="cash" name="paymentMethod" value="cash" v-model="selectedMethod">
        <label for="cash">Cash</label>
      </div>
      <div>
        <input type="radio" id="card" name="paymentMethod" value="card" v-model="selectedMethod">
        <label for="card">Card</label>
      </div>
      <div>
        <input type="radio" id="loyalty" name="paymentMethod" value="loyalty" v-model="selectedMethod">
        <label for="loyalty">Loyalty Points</label>
      </div>
      <button type="submit">Submit Payment</button>
    </form>
    <div id="payment-details">
      <p>{{ paymentStatus }}</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submitPayment() {
      const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
      // Handle payment based on selected method (e.g., display cash receipt, prompt for card details, deduct loyalty points)
      console.log("Selected payment method:", selectedMethod);
      
      // Update payment-details section based on selection (pseudocode)
      const paymentDetails = document.getElementById('payment-details');
      paymentDetails.innerHTML = ""; // Clear previous content
      if (selectedMethod === "cash") {
        paymentDetails.innerHTML = "Cash payment successful. Please keep your receipt.";
      } else if (selectedMethod === "card") {
        paymentDetails.innerHTML = "Please enter your card details to proceed.";
        // Add form for card details (omitted for brevity)
      } else if (selectedMethod === "loyalty") {
        paymentDetails.innerHTML = "Please confirm the number of loyalty points to use.";
        // Add input for loyalty points (omitted for brevity)
      }
    }
  }
}
</script> 