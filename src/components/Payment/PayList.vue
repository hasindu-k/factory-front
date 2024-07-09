<script>
import DeleteCartProduct from "./DeletePay.vue";
import SuccessPopup from "./PayTransactions.vue";

export default {
  data() {
    return {
      transactions: [],
      editingTransaction: false,
      editTransactionID: null, // ID of the transaction being edited
      error: null, // Variable to store error messages if any
      selectedTransactionForDeletion: null, // Variable to store the selected transaction for deletion
      searchTerm: "", // Search term for filtering transactions
      showSuccessPopup: false, // Flag to control the display of success popup
      productPrices: {}, // Object to store prices of products
      totalAmount: 0, // Total amount of the transaction
      selectedPaymentMethod: "", // Selected payment method for the transaction
      // Track the selected payment method
    };
  },
  methods: {
    async processPayment() {
      try {
        // Based on the selected payment method, process the payment
        switch (this.selectedPaymentMethod) {
          case "cash":
            await this.processCashPayment();
            break;
          case "card":
            await this.processCardPayment();
            break;
          case "loyalty":
            await this.processLoyaltyPointsPayment();
            break;
          default:
            throw new Error("Invalid payment method selected");
        }

        // Clear cart after successful payment
        this.cartProducts = [];
        this.totalAmount = 0;
        this.selectedPaymentMethod = "";

        // Show success message
        this.showSuccessPopup = true;

        // Clear success message after some time
        setTimeout(() => {
          this.showSuccessPopup = false;
        }, 3000);
      } catch (error) {
        console.error("Error processing payment:", error);
        this.error = error.message;
      }
    },
    async processCashPayment() {
      // Implement logic to handle cash payment
      // You may need to update the server-side logic to record the transaction
    },
    async processCardPayment() {
      // Implement logic to handle card payment
      // You may need to integrate with a payment gateway and update the server-side logic to record the transaction
    },
    async processLoyaltyPointsPayment() {
      // Implement logic to handle payment using loyalty points
      // Deduct loyalty points from the customer's balance and update the server-side logic to record the transaction
    },
  },

  components: {
    DeleteCartProduct,
    SuccessPopup,
  },
}

</script>
