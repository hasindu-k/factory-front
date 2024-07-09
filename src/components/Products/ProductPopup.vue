<template>
  <div class="modal-overlay" @click="closePopup">
    <div class="custom-modal" @click.stop>
      <div class="product-details">
        <div class="product-image">
          <img :src="product.productPhoto" alt="Product Image">
        </div>
        <div class="product-info">
          <h2>{{ product.productName }}</h2>
          <div class="form-group">
            <label for="productId" class = "label">Product ID:</label>
            <p>{{ product.productId }}</p>
          </div>
          <div class="form-group">
            <label for="pDescription" class = "label">Product Description:</label>
            <p>{{ product.pDescription }}</p>
          </div>
          <div class="form-group" >
            <label for="price" class = "label">Price:</label>
            <p>{{ product.price }}</p>
          </div>
          <div class="form-group">
            <label for="avaiStock" class = "label">Available Stock:</label>
            <p>{{ product.avaiStock }}</p>
          </div>
          <div class="button-container">
            <button class="btn btn-primary" @click="buyProduct(product, $event)">Buy</button>
            <button class="btn btn-success" @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showToast" class="toast-message" :class="toastClass">{{ toastMessage }}</div>
  <PaymentDetails v-if="showPaymentDetails" @close="closePaymentDetailsModal" />
</template>

<script>
import PaymentDetails from './payment-details.vue';
export default {
  components: {
    PaymentDetails,
  },
  data() {
    return {
      isPopupVisible: true,
      showToast: false,
      toastMessage: "",
      toastClass: "", // Added toastClass property
      selectedProduct: null,
      showPaymentDetails: false,
    };
  },
  props: {
    product: Object
  },
  methods: {
    closePopup() {
      this.$emit('close');
    },
    buyProduct(cartProduct) {
      // Set the selected product
      this.selectedProduct = cartProduct;
      this.isPopupVisible = false;
      // Show payment details modal
      this.showPaymentDetails = true;
    },
    closePaymentDetailsModal() {
      // Close payment details modal
      this.showPaymentDetails = false;
      // Reset selected product
      this.selectedProduct = null;
    },
    async addToCart(product) {
      try {
        // Fetch the current cart contents
        const cartResponse = await fetch("http://localhost:5154/api/Cart/GetAllCartProducts");
        if (!cartResponse.ok) {
          throw new Error("Error fetching cart contents. Status: " + cartResponse.status);
        }
        const cartData = await cartResponse.json();

        // Check if the product is already in the cart
        const productInCart = cartData.find(item => item.productId === product.productId);
        if (productInCart) {
          // If the product is already in the cart, show an error message and close the popup
          this.showToastMessage("Product is already in the cart!", 'error');
          this.closePopup();
          return;
        }

        // If the product is not in the cart, proceed to add it
        const quantity = 1; // Default quantity
        const data = {
          productName: product.productName, // Ensure productName is included
          productId: product.productId,
          quantity
        };

        const response = await fetch("http://localhost:5154/api/Cart/PostCartProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Error adding product to cart. Status: ${response.status}. ${errorMessage}`);
        }

        // If the response status is OK, show a success message
        this.showToastMessage("Product added to cart!", 'success');

        // Close the popup
        this.closePopup();

      } catch (error) {
        console.error("Error adding product to cart:", error);
        this.showToastMessage("Error adding product to cart", 'error');
      }
    },
    showToastMessage(message, messageType = 'success') {
      this.toastMessage = message;
      this.toastClass = messageType === 'error' ? 'error-message' : 'success-message';
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
        this.toastClass = "";
      }, 3000); // Hide toast after 3 seconds
    },
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.custom-modal {
  background: #11e609;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 800px; /* Maximum width */
  max-height: 600px; /* Maximum height */
  width: auto; /* Allow width to adjust */
  height: auto; /* Allow height to adjust */
  min-width: 300px; /* Minimum width */
  min-height: 300px; /* Minimum height */
  display: flex;
  flex-direction: column;
}

.product-details {
  display: flex;
  align-items: center;
}


.product-image {
  width: 300px; /* Adjust width as needed */
  height: 300px; /* Adjust height as needed */
  border-radius: 50%; /* Make it circular */
  overflow: hidden; /* Hide overflow content */
  background-color: #006400; /* Background color */
  display: flex; /* Use flexbox */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  margin: auto;
}

.toastClass {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4caf50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  z-index: 999;
  animation: slideIn 0.5s forwards, slideOut 0.5s 2.5s forwards;
}
.product-image h2 {
  font-size: 24px;
  font-weight: bold;
  /* Add some space between the image and the product name */
  text-align: center; /* Center the product name */
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.label{
  color: rgb(132, 128, 128);
}
.product-info {
  flex: 2;
  padding-left: 20px;
}

.form-group {
  font-weight: bold;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.button-container {
  display: flex;
  justify-content: space-around; /* Adjust button spacing */
  margin-top: 20px;
}

.btn {
  padding: 10px 0; /* Equal padding top and bottom */
  width: calc(50% - 10px); /* Set width for each button */
  cursor: pointer;
}

.btn-primary {
  background-color: #6c63ff;
  color: #fff;
  border: none;
}

.btn-primary:hover {
  background-color: #5248ff;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
  border: none;
}

.btn-success:hover {
  background-color: #218838;
}

.toast-message {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 9999;
}

.success-message {
  background-color: #28a745;
}

.error-message {
  background-color: #dc3545;
}
</style>
