<template>
  <div class="product-list-page container mt-3">
    <div class="mb-3 search-bar">
  <label for="search" class="search-label">Search</label>
  <input type="text" class="form-control search-input" id="search" placeholder="Search Products . . ." v-model="searchTerm" @input="searchProducts" />
</div>


    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.productId" class="product-item" @click="showPopup(product, $event)">
  <div class="product-image">
    <img :src="product.productPhoto" alt="Product Image" />
  </div>
  <div class="product-details">
    <h3 class="product-name">{{ product.productName }}</h3>
    <p class="product-price">{{ product.price }}</p>
    <p class="product-availability">{{ product.avaiStock }} Available</p>
    <div class="product-actions">
      <button class="btn btn-primary" @click="buyProduct(product)">Buy</button>
      <button class="btn btn-success" @click="addToCart(product)">Add to Cart</button>
      
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

    <ProductPopup v-if="isPopupVisible" :product="selectedProduct" @close="hidePopup" />
  </div>
</template>

<script>
import ProductPopup from './ProductPopup.vue';
export default {
  components: {
    ProductPopup
  },
  data() {
    return {
      products: [],
      searchTerm: "",
      showToast: false,
      toastMessage: "",
      isPopupVisible: false,
      selectedProduct: null
    };
  },
  mounted() {
    this.fetchProductDetails();
  // Log product photo URLs to the console
  console.log("Product Photo URLs:", this.products.map(product => product.productPhoto));
  },
  computed: {
    filteredProducts() {
      return this.products.filter(product => {
        const searchLower = this.searchTerm.toLowerCase();
        return product.productName.toLowerCase().includes(searchLower);
      });
    }
  },
  methods: {

    showPopup(product, event) {
  // Check if the click event target is not the "Buy" or "Add to Cart" button
  if (!event.target.classList.contains('btn-primary') && !event.target.classList.contains('btn-success')) {
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
        const response = await fetch(`https://localhost:44378/api/Product/GetAllProducts`);
        if (!response.ok) {
          throw new Error("Error fetching product details. Status: " + response.status);
        }
        const responseData = await response.json();
        this.products = responseData;
      } catch (error) {
        console.error("Error fetching product details:", error);
        this.showToastMessage("Error fetching product details" , 'error');
      }
    },
    searchProducts() {
      // No need to modify this method as it's already correctly implemented
    },
    buyProduct(product) {
      // Implement buy logic here
      console.log("Buy product:", product);
    },
    async addToCart(product) {
  try {
    // Fetch the current cart contents
    const cartResponse = await fetch("https://localhost:44378/api/Cart/GetAllCartProducts");
    if (!cartResponse.ok) {
      throw new Error("Error fetching cart contents. Status: " + cartResponse.status);
    }
    const cartData = await cartResponse.json();

    // Check if the product is already in the cart
    const productInCart = cartData.find(item => item.productId === product.productId);
    if (productInCart) {
      // If the product is already in the cart, show an error message
      this.showToastMessage("Product is already in the cart!" , 'error');
      return;
    }

    // If the product is not in the cart, proceed to add it
    const quantity = 1; // Default quantity
    const data = {
      productName: product.productName, // Ensure productName is included
      productId: product.productId,
      quantity
    };

    const response = await fetch("https://localhost:44378/api/Cart/PostCartProducts", {
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
  if (messageType === 'error') {
    this.toastClass = 'error-message';
  } else if (messageType === 'success') {
    this.toastClass = 'success-message';
  }
},

    
  }
};
</script>

<style scoped>
.body {
  background-color: #003300; /* Change background color to dark green */
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
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.product-item {
  background-color: #6fe879;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.product-image {
  width: 100%;
  height: 200px; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* Adjust object-fit property as needed */
}

.product-details {
  padding: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.product-price {
  font-size: 14px;
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

.error-message {
  color: red; /* Set text color to red */
}

@keyframes slideIn {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(0); }
}

@keyframes slideOut {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100%); }
}
</style> 