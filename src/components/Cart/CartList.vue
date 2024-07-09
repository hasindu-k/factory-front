<template>
  <div class="header-cart-list">
    <PageHeader />
    <div class="cart-background">
      <div class="Cart-list-page container mt-3">
        <h1 class="mb-4">Cart List</h1>
        <div class="search-container">
          <label for="search" class="visually-hidden">Search:</label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              id="search"
              placeholder="Search Products"
              v-model="searchTerm"
              @input="searchCartProducts"
            />
            <button
              class="btn btn-primary"
              type="button"
              @click="searchCartProducts"
            >
              <i class="fas fa-search"></i>
              <span class="visually-hidden">Search</span>
            </button>
          </div>
          <h2 class="total-price">Total Price: {{ getTotalPrice() }}</h2>
        </div>

        <table class="ProductTable">
          <thead class="thead-dark">
            <tr>
              <th>Cart ID</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody v-if="filteredCartProducts.length > 0">
            <tr
              v-for="cartProduct in filteredCartProducts"
              :key="cartProduct.cId"
            >
              <td>{{ cartProduct.cId }}</td>
              <td>{{ cartProduct.productName }}</td>
              <td>
                <input type="number" v-model="cartProduct.quantity" min="1" />
              </td>
              <td>{{ calculateTotalPrice(cartProduct) }}</td>
              <td>
                <div class="button-group">
                  <button
                    class="btn btn-primary btn-sm"
                    @click="buyProduct(cartProduct)"
                  >
                    Buy
                  </button>
                  <button
                    class="btn btn-success btn-sm"
                    @click="saveQuantity(cartProduct)"
                  >
                    Save
                  </button>
                  <button
                    class="btn btn-danger btn-sm"
                    @click="deleteCartProduct(cartProduct.cId)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="6">No matching products found.</td>
            </tr>
          </tbody>
        </table>
        <div v-if="editing">
          <edit-cartProduct
            :cartProduct="
              cartProducts.find((cartProduct) => cartProduct.cId === editCId)
            "
            @update="updateCartProduct"
            @cancel="cancelEdit"
          ></edit-cartProduct>
        </div>
        <DeleteCartProduct
          v-if="selectedCartProductForDeletion"
          :cartProduct="selectedCartProductForDeletion"
          @delete="performDelete"
          @cancel="cancelDelete"
        />
        <SuccessPopup
          v-if="showSuccessPopup"
          :message="successMessage"
          @close="showSuccessPopup = false"
        />
        <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
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
import PageHeader from "../PageHeader.vue";
import PageFooter from "../PageFooter.vue";
import DeleteCartProduct from "./DeleteCartProduct.vue";
import SuccessPopup from "./SuccessPopUp.vue";
import PaymentDetails from "./PaymentDetails.vue";

export default {
  data() {
    return {
      cartProducts: [],
      editing: false,
      editCId: null,
      error: null,
      selectedCartProductForDeletion: null,
      searchTerm: "",
      showSuccessPopup: false,
      productPrices: {},
      showPaymentDetails: false,
      selectedProduct: null,
    };
  },
  mounted() {
    this.fetchCartProductDetails();
    this.fetchProductPrices();
  },
  computed: {
    filteredCartProducts() {
      return this.cartProducts.filter((cartProduct) => {
        const searchLower = this.searchTerm.toLowerCase();
        return (
          cartProduct &&
          cartProduct.productName &&
          cartProduct.productName.toLowerCase().includes(searchLower)
        );
      });
    },
  },
  methods: {
    getTotalPrice() {
      let totalPrice = 0;
      this.filteredCartProducts.forEach((cartProduct) => {
        totalPrice += this.calculateTotalPrice(cartProduct);
      });
      return totalPrice.toFixed(2); // Round to 2 decimal places
    },
    searchCartProducts() {
      this.filteredCartProducts = this.cartProducts.filter((cartProduct) => {
        const searchLower = this.searchTerm.toLowerCase();
        return cartProduct.productName.toLowerCase().includes(searchLower);
      });
    },
    async fetchCartProductDetails() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/cart/getallcartproducts"
        );
        if (!response.ok) {
          throw new Error(
            "Error fetching product details. Status: " + response.status
          );
        }
        const responseData = await response.json();
        this.cartProducts = responseData;
      } catch (error) {
        console.error("Error fetching product details:", error);
        this.error = "Error fetching product details";
      }
    },

    deleteCartProduct(cId) {
      this.selectedCartProductForDeletion = this.cartProducts.find(
        (cartProduct) => cartProduct.cId === cId
      );
    },
    async performDelete(cId) {
      const updatedCartProducts = this.cartProducts.filter(
        (cartProduct) => cartProduct.cId !== cId
      );
      this.cartProducts = updatedCartProducts;

      try {
        await this.deleteCartProductOnServer(cId);
      } catch (error) {
        console.error("Error deleting product on the server:", error);
      }

      this.selectedCartProductForDeletion = null;
    },
    async deleteCartProductOnServer(cId) {
      const url = `http://localhost:5154/api/Cart/DeleteCartProducts?cId=${cId}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to delete products on the server. Status: ${response.status}`
        );
      }
    },
    cancelDelete() {
      this.selectedCartProductForDeletion = null;
    },
    async saveQuantity(cartProduct) {
      try {
        const requestBody = {
          cId: cartProduct.cId,
          quantity: cartProduct.quantity,
          ProductName: cartProduct.productName, // Include the ProductName field
        };

        const response = await fetch(
          `http://localhost:5154/api/Cart/UpdateCartProducts`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(
            `Failed to update quantity. Status: ${response.status}. Error: ${errorMessage}`
          );
        }
        this.showSuccessPopup = true;

        // Clear success message after some time (e.g., 3 seconds)
        setTimeout(() => {
          this.showSuccessPopup = false;
        }, 3000);
      } catch (error) {
        console.error("Error updating quantity:", error);
        this.error = error.message; // Display more informative error message
      }
    },

    async fetchProductPrices() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Product/GetAllProducts"
        );
        if (!response.ok) {
          throw new Error("Error fetching product prices");
        }
        const products = await response.json();
        // Convert the products array into a map for easy lookup by product name
        this.productPrices = products.reduce((map, product) => {
          map[product.productName] = product.price;
          return map;
        }, {});
      } catch (error) {
        console.error("Error fetching product prices:", error);
        this.error = error.message;
      }
    },
    calculateTotalPrice(cartProduct) {
      const price = this.productPrices[cartProduct.productName] || 0;
      return cartProduct.quantity * price;
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
  },

  components: {
    DeleteCartProduct,
    SuccessPopup,
    PaymentDetails,
    PageFooter,
    PageHeader,
  },
};
</script>

<style scoped>
.cart-background {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("/src/assets/2.png");
  background-size: cover;
  background-position: center;
}
.Cart-list-page {
  max-width: 2000px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* Heading styles */
.Cart-list-page h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

/* Search input styles */
.search-container {
  margin-bottom: 20px;
}
.search-icon {
  position: absolute;
  top: 50%;
  right: 10px; /* Adjust as needed */
  transform: translateY(-50%);
  color: #01070d; /* Icon color */
  cursor: pointer;
  z-index: 1; /* Ensure the icon is above the input field */
}

/* Input group styles */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.form-control {
  width: calc(100% - 40px); /* Adjusted for button width */
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 12px;
  font-size: 16px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.btn-primary {
  background-color: #007bff;
  border: none;
  color: #fff;
  border-radius: 0 4px 4px 0;
  padding: 12px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-primary i {
  margin-right: 5px;
}

.total-price {
  font-style: italic;

  margin-top: 10px;
  font-size: 18px;
  color: #333;
  font-weight: bold;
}

/* Visually hidden class */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.ProductTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center; /* Center align all content in cells */
}

th {
  background-color: #f2f2f2;
  font-weight: bold;
  color: #333;
}

/* Alternating row colors */
.ProductTable tbody tr:nth-child(even) {
  background-color: #0ab110; /* dark green for even rows */
}

.ProductTable tbody tr:nth-child(odd) {
  background-color: #d9f7e6; /* light green for odd rows */
}

/* Button styles */
.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-success {
  background-color: #28a745;
  color: #fff;
}

.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.btn-sm {
  font-size: 14px;
}

.btn:hover {
  opacity: 0.8;
}

/* Error message styles */
.alert {
  margin-top: 20px;
  padding: 10px;
  border-radius: 4px;
  background-color: #f8d7da;
  color: #721c24;
  font-size: 14px;
}

/* Additional styles */
.button-group {
  display: flex;
  justify-content: center; /* Center align buttons in the same column */
  gap: 10px; /* Add space between buttons */
}

.input-group input[type="number"] {
  text-align: center; /* Center align quantity input */
}
</style>
