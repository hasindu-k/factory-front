<template>
  <div class="header-cus-product-list">
    <PageHeader />
    <div class="list-background">
      <div class="product-list-page container mt-3">
        <div class="mb-3 search-bar">
          <label for="search" class="search-label">Search</label>
          <input
            type="text"
            class="form-control search-input"
            id="search"
            placeholder="Search Products . . ."
            v-model="searchTerm"
            @input="searchProducts"
          />
        </div>

        <div class="product-list">
          <div
            v-for="product in filteredProducts"
            :key="product.productId"
            class="product-item"
            @click="showPopup(product, $event)"
          >
            <div class="product-image">
              <img :src="product.productPhoto" alt="Product Image" />
            </div>
            <div class="product-details">
              <h3 class="product-name">{{ product.productName }}</h3>
              <p class="product-price">{{ product.price }}</p>
              <p class="product-availability">
                {{ product.avaiStock }} Available
              </p>
              <div class="product-actions">
                <button
                  class="btn btn-primary"
                  @click="buyProduct(product, $event)"
                >
                  Buy
                </button>
                <button class="btn btn-success" @click="addToCart(product)">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
          <div v-if="filteredProducts.length === 0" class="no-results">
            No matching products found
          </div>
        </div>

        <!-- Confirmation message -->
        <div v-if="showToast" class="confirmation-message">
          {{ toastMessage }}
        </div>

        <ProductPopup
          v-if="isPopupVisible"
          :product="selectedProduct"
          @close="hidePopup"
        />
      </div>
      <PaymentDetails
        v-if="showPaymentDetails"
        :productName="selectedProduct.productName"
        @close="closePaymentDetailsModal"
      />
    </div>
    <PageFooter />
  </div>
</template>

<script>
import ProductPopup from "./ProductPopup.vue";
import PaymentDetails from "./payment-details.vue";
import PageHeader from "../PageHeader.vue";
import PageFooter from "../PageFooter.vue";
export default {
  components: {
    ProductPopup,
    PaymentDetails,
    PageFooter,
    PageHeader,
  },
  data() {
    return {
      products: [],
      searchTerm: "",
      showToast: false,
      toastMessage: "",
      isPopupVisible: false,
      selectedProduct: null,
      showPaymentDetails: false,
    };
  },
  mounted() {
    this.fetchProductDetails();
    // Log product photo URLs to the console
    console.log(
      "Product Photo URLs:",
      this.products.map((product) => product.productPhoto)
    );
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        const searchLower = this.searchTerm.toLowerCase();
        return product.productName.toLowerCase().includes(searchLower);
      });
    },
  },
  methods: {
    showPopup(product, event) {
      // Check if the click event target is not the "Buy" or "Add to Cart" button
      if (
        !event.target.classList.contains("btn-primary") &&
        !event.target.classList.contains("btn-success")
      ) {
        this.selectedProduct = product;
        this.isPopupVisible = true;
      } else {
        // Stop the click event propagation to prevent the popup from opening
        event.stopPropagation();
      }
    },

    hidePopup() {
      this.selectedProduct = null;
      this.isPopupVisible = false;
    },
    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        // Read the selected file as a data URL and assign it to newProduct.productPhoto
        const reader = new FileReader();
        reader.onload = (e) => {
          this.newProduct.productPhoto = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async fetchProductDetails() {
      try {
        const response = await fetch(
          `http://localhost:5154/api/Product/GetAllProducts`
        );
        if (!response.ok) {
          throw new Error(
            "Error fetching product details. Status: " + response.status
          );
        }
        const responseData = await response.json();
        this.products = responseData;
      } catch (error) {
        console.error("Error fetching product details:", error);
        this.showToastMessage("Error fetching product details", "error");
      }
    },

    buyProduct(cartProduct) {
      // Set the selected product
      this.selectedProduct = cartProduct;
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
        const cartResponse = await fetch(
          "http://localhost:5154/api/Cart/GetAllCartProducts"
        );
        if (!cartResponse.ok) {
          throw new Error(
            "Error fetching cart contents. Status: " + cartResponse.status
          );
        }
        const cartData = await cartResponse.json();

        // Check if the product is already in the cart
        const productInCart = cartData.find(
          (item) => item.productId === product.productId
        );
        if (productInCart) {
          // If the product is already in the cart, show an error message
          this.showToastMessage("Product is already in the cart!", "error");
          return;
        }

        // If the product is not in the cart, proceed to add it
        const quantity = 1; // Default quantity
        const data = {
          productName: product.productName, // Ensure productName is included
          productId: product.productId,
          quantity,
        };

        const response = await fetch(
          "http://localhost:5154/api/Cart/PostCartProducts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `Error adding product to cart. Status: ${response.status}. ${errorMessage}`
          );
        }

        // If the response status is OK, show a success message
        this.showToastMessage("Product added to cart!");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        this.showToastMessage("Error adding product to cart");
      }
    },

    showToastMessage(message, messageType) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
      }, 3000); // Hide toast after 3 seconds

      // Determine the appropriate class based on messageType
      if (messageType === "error") {
        this.toastClass = "error-message";
      } else if (messageType === "success") {
        this.toastClass = "success-message";
      }
    },
  },
};
</script>

<style scoped>
.list-background {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/2.png");
  background-size: cover;
  background-position: center;
}
.search-bar {
  display: flex;
  align-items: center;
  padding: 20px;
}

.search-label {
  margin-right: 10px;
  font-weight: bold;
}

.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.product-list-page {
  padding: 20px;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(250px, 1fr)
  ); /* Adjust minmax width */
  gap: 20px;
}

.product-item {
  background-color: #6fe879;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  width: 250px; /* Set a fixed width for each product item */
}

.product-item:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background-color: #12b53e; /* Dark green background color */
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-details {
  padding: 20px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  font-size: 16px;
  color: #888;
}

.product-availability {
  font-size: 14px;
  color: #888;
}

.no-results {
  margin-top: 20px;
  text-align: center;
  font-style: italic;
  color: #888;
}

.confirmation-message {
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
  background: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  overflow-y: auto; /* Add this line */
  max-height: 80%;
}

.custom-modal h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  color: #333;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.alert {
  margin-top: 10px;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
}

.btn {
  padding: 10px 20px;
  margin: 5px;
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

.btn-secondary {
  background-color: #ccc;
  color: #333;
  border: none;
}

.btn-secondary:hover {
  background-color: #999;
}

@keyframes slideIn {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slideOut {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
