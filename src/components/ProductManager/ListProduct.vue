<template>
  <PageHeader />
  <div class="product-list-page container mt-3">
    <h1 class="mb-4">Product List</h1>
    <div class="mb-3">
      <div class="search">
        <label for="search">Search</label>
        <input
          type="text"
          class="form-control"
          id="search"
          placeholder="Search Products . . ."
          v-model="searchTerm"
          @input="searchProducts"
        />
      </div>
      <div class="btn-add-gen">
        <button class="btn btn-primary" @click="openAddProductForm">
          Add Product
        </button>
        <button class="btn btn-primary" @click="generateReport">
          Generate Report
        </button>
      </div>
    </div>

    <!-- Product list -->
    <div class="product-list">
      <div
        v-for="product in filteredProducts"
        :key="product.productId"
        class="product-item"
        @click="openPopup(product)"
      >
        <div class="product-image">
          <img :src="product.productPhoto" alt="Product Image" />
        </div>
        <div class="product-details">
          <h3 class="product-name">{{ product.productName }}</h3>
          <h3 class="product-id">Product Id:{{ product.productId }}</h3>
          <div class="product-info">
            <p class="product-availability">
              Available: {{ product.avaiStock }}
            </p>
            <p class="product-price">Price: {{ product.price }}</p>
          </div>
          <div class="product-actions">
            <button class="btn btn-primary" @click="editProduct(product)">
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="performDelete(product.productId)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div v-if="filteredProducts.length === 0" class="no-results">
        No matching products found
      </div>
    </div>

    <div v-if="editing">
      <edit-product
        :product="
          products.find((product) => product.productId === editProductId)
        "
        @update="updateProduct"
        @cancel="cancelEdit"
      ></edit-product>
    </div>

    <!-- Confirmation message -->
    <div v-if="showToast" class="confirmation-message">
      {{ toastMessage }}
    </div>
    <DeleteProduct
      v-if="selectedProductForDeletion"
      :product="selectedProductForDeletion"
      @delete="deleteProduct"
      @cancel="cancelDelete"
    />

    <div v-if="isAddProductFormVisible" class="modal-overlay">
      <div class="custom-modal">
        <div class="left-side dark-green-bg">
          <div class="title-container">
            <h2 class="mb-4">Add New Product</h2>
          </div>
        </div>
        <div class="right-side light-green-bg">
          <div class="form-group">
            <label for="productPhoto">Product Image:</label>
            <img
              v-if="newProduct.productPhoto"
              :src="newProduct.productPhoto"
              alt="Product Image"
              style="max-width: 100%; height: auto"
            />
            <input
              type="file"
              @change="handlePhotoChange"
              class="form-control"
              accept="image/*"
            />
            <div v-if="productPhotoError" class="alert alert-danger mt-2">
              {{ productPhotoError }}
            </div>
          </div>

          <div class="form-group">
            <label for="productName">Product Name:</label>
            <input
              type="text"
              class="form-control"
              id="ProductName"
              v-model="newProduct.productName"
            />
            <div v-if="productNameError" class="alert alert-danger mt-2">
              {{ productNameError }}
            </div>
          </div>

          <div class="form-group">
            <label for="pDescription">Product Description:</label>
            <input
              type="text"
              class="form-control"
              id="pDescription"
              v-model="newProduct.pDescription"
            />
            <div v-if="pDescriptionError" class="alert alert-danger mt-2">
              {{ pDescriptionError }}
            </div>
          </div>

          <div class="form-group">
            <label for="price">Price:</label>
            <input
              type="number"
              class="form-control"
              id="price"
              v-model="newProduct.price"
            />
            <div v-if="priceError" class="alert alert-danger mt-2">
              {{ priceError }}
            </div>
          </div>

          <div class="form-group">
            <label for="avaiStock">Available Stock:</label>
            <input
              type="number"
              class="form-control"
              id="avaiStock"
              v-model="newProduct.avaiStock"
            />
            <div v-if="productStockError" class="alert alert-danger mt-2">
              {{ productStockError }}
            </div>
          </div>

          <button class="btn btn-primary" @click="addProduct">
            Add Product
          </button>
          <button class="btn btn-secondary" @click="cancelAddProduct">
            Cancel
          </button>
        </div>
      </div>
    </div>

    <product-details-popup
      v-if="isPopupVisible"
      :product="selectedProduct"
      @close="closePopup"
    />
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "../PageHeaderManager.vue";
import PageFooter from "../PageFooter.vue";
import DeleteProduct from "./DeleteProduct.vue";
import EditProduct from "./EditManagerProduct.vue";
import ProductDetailsPopup from "./ProductDetailsPopup.vue";

export default {
  data() {
    return {
      products: [],
      searchTerm: "",
      showToast: false,
      toastMessage: "",
      newProduct: {
        productId: 0,
        productPhoto: "",
        productName: "",
        pDescription: "",
        price: 0,
        avaiStock: 0,
      },
      editing: false,
      editProductId: null,
      productPhotoError: "",
      productNameError: "",
      pDescriptionError: "",
      productStockError: "",
      priceError: null,
      selectedProductForDeletion: null,
      isAddProductFormVisible: false,
      isPopupVisible: false,
      selectedProduct: null,
    };
  },
  mounted() {
    this.fetchProductDetails();
  },
  computed: {
    filteredProducts() {
      const searchTermLower = this.searchTerm.toLowerCase();
      return this.products.filter((product) => {
        return (
          product.productName &&
          product.productName.toLowerCase().includes(searchTermLower)
        );
      });
    },
  },
  methods: {
    generateReport() {
      // Get the current date and time
      const currentDateTime = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const companyName = "URUWALA TEA FACTORY";
      const companyAddress = "Uruwala Tea Estate, Akuressa, 10450 , Sri Lanka";
      const email = "uruwalatea@gmail.com";

      // Logo URL
      const logoUrl = "https://example.com/logo.png"; // Replace this URL with the actual URL of your logo image

      // Create the header section
      let headerHtml = `
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; float: left; margin-right: 20px;">
    <div style="float: left;">
      <h1>STOCK REPORT</h1>
      <p>Date: ${currentDateTime}</p>
      <h2>${companyName}</h2>
      <p>${companyAddress}</p>
      <p>${email}</p>
    </div> 
    <div style="clear: both;"></div>
  </div>
`;

      // Create a table header row
      let tableHtml = `
    ${headerHtml}
    <table border="1">
      <tr>
        <th style="width: 15%; text-align: center;">Product ID</th>
        <th style="width: 15%; text-align: center;">Product Name</th>
        <th style="width: 15%; text-align: center;">Price</th>
        <th style="width: 15%; text-align: center;">Available Stock</th>
      </tr>
  `;

      // Iterate through all products and add each product's details to the table
      this.products.forEach((product) => {
        tableHtml += `
      <tr>
        <td style="text-align: center;">${product.productId}</td>
        <td style="text-align: center;">${product.productName}</td>
        <td style="text-align: center;">${product.price}</td>
        <td style="text-align: center;">${product.avaiStock}</td>
      </tr>
    `;
      });

      // Close the table tag
      tableHtml += "</table>";

      // Convert HTML table to PDF
      const opt = {
        margin: 1,
        filename: `StockReport_${currentDateTime.replace(
          /[^\w\s]/gi,
          "_"
        )}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      // Use html2pdf library to convert HTML to PDF
      window.html2pdf().set(opt).from(tableHtml).save();
    },

    openPopup(product) {
      if (this.editing) {
        // If editing mode is active, do not open the popup
        return;
      }
      if (this.selectedProductForDeletion) {
        return;
      }
      // Check if the clicked element is the edit button
      const target = event.target;
      if (target.tagName === "BUTTON" && target.innerText === "Edit") {
        return;
      }
      this.selectedProduct = product;
      this.isPopupVisible = true;
    },

    closePopup() {
      this.selectedProduct = null;
      this.isPopupVisible = false;
    },

    handlePhotoChange(event) {
      const file = event.target.files[0];
      // this.newProduct.productPhoto = event.target.files[0];

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
        this.showToastMessage("Error fetching product details");
      }
    },
    searchProducts() {},

    openAddProductForm() {
      this.isAddProductFormVisible = true;
    },

    addProduct() {
      // Reset error messages
      this.productNameError = "";
      this.pDescriptionError = "";
      this.priceError = "";
      this.productStockError = "";

      // Validate form fields
      if (
        !this.newProduct.productName ||
        /\d/.test(this.newProduct.productName)
      ) {
        this.productNameError = "Product Name should be characters";
      }
      if (!this.newProduct.pDescription) {
        this.pDescriptionError = "Product Description Required";
      }
      if (!this.newProduct.price) {
        this.priceError = "Product Price Required";
      }
      if (!this.newProduct.avaiStock) {
        this.productStockError = "Product Stock Required";
      }

      // If there are any errors, return without adding the product
      if (
        this.productNameError ||
        this.pDescriptionError ||
        this.priceError ||
        this.productStockError
      ) {
        return;
      }

      // Prepare data for API call
      const newProductData = {
        productId: this.newProduct.productId,
        productPhoto: this.newProduct.productPhoto,
        productName: this.newProduct.productName,
        pDescription: this.newProduct.pDescription,
        price: this.newProduct.price,
        avaiStock: this.newProduct.avaiStock,
      };

      // Make API call to add the product
      fetch("http://localhost:5154/api/Product/PostProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to add product. Status: ${response.status}`
            );
          } else {
            this.fetchProductDetails();
          }
          return response.json();
        })
        .then((newProduct) => {
          // Add the newly created product to the products array
          this.products.push(newProduct);
          // Display toast message indicating success
          this.showToastMessage("Product added successfully");
          // Reset form fields
          this.newProduct = {
            productId: 0,
            productPhoto: "",
            productName: "",
            pDescription: "",
            price: 0,
            avaiStock: 0,
          };
          // Reset error messages
          this.productNameError = null;
          this.pDescriptionError = null;
          this.priceError = null;
          this.productStockError = null;
          // Hide the add product form
          this.isAddProductFormVisible = false;
        })
        .catch((error) => {
          console.error("Error adding product:", error);
          this.showToastMessage("Error adding product");
        });
    },

    cancelAddProduct() {
      this.newProduct = {
        productPhoto: "",
        productName: "",
        pDescription: "",
        price: 0,
        avaiStock: 0,
      };
      this.isAddProductFormVisible = false;
    },

    deleteProduct(productId) {
      const index = this.products.findIndex(
        (product) => product.productId === productId
      );

      if (index !== -1) {
        // Check if the product is in the customer's cart
        fetch(`http://localhost:5154/api/Cart/GetAllCartProducts`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Error fetching cart contents. Status: ${response.status}`
              );
            }
            return response.json();
          })
          .then((cartProducts) => {
            const productInCart = cartProducts.find(
              (item) => item.productId === productId
            );
            if (productInCart) {
              // Product is in the cart, display error message
              this.showToastMessage(
                "Product cannot be deleted because it is in the cart",
                "error"
              );
            } else {
              // Product is not in the cart, proceed with deletion
              fetch(
                `http://localhost:5154/api/Product/DeleteProducts?productId=${productId}`,
                {
                  method: "DELETE",
                }
              )
                .then((response) => {
                  if (!response.ok) {
                    throw new Error(
                      `Failed to delete product with ID ${productId}. Status: ${response.status}`
                    );
                  }
                  this.products.splice(index, 1);
                  this.showToastMessage("Product deleted successfully");
                  this.selectedProductForDeletion = null;
                })
                .catch((error) => {
                  console.error(
                    `Error deleting product with ID ${productId}:`,
                    error
                  );
                  this.showToastMessage("Error deleting product");
                });
            }
          })
          .catch((error) => {
            console.error("Error checking cart contents:", error);
            this.showToastMessage("Error checking cart contents", "error");
          });
      } else {
        console.error(`Product with ID ${productId} not found.`);
      }
    },

    performDelete(productId) {
      this.selectedProductForDeletion = this.products.find(
        (product) => product.productId === productId
      );
    },

    cancelDelete() {
      this.selectedProductForDeletion = null;
    },
    showToastMessage(message) {
      this.showToast = true;
      this.toastMessage = message;

      setTimeout(() => {
        this.showToast = false;
        this.toastMessage = "";
      }, 3000);
    },
    editProduct(product) {
      this.editing = true;
      this.editProductId = product.productId;
    },
    cancelEdit() {
      this.editing = false;
      this.editProductId = null;
    },

    updateProduct(updatedProduct) {
      const updatedProductData = {
        productPhoto: updatedProduct.productPhoto,
        productId: updatedProduct.productId,
        productName: updatedProduct.productName,
        pDescription: updatedProduct.pDescription,
        avaiStock: updatedProduct.avaiStock,
        price: updatedProduct.price,
      };

      fetch("http://localhost:5154/api/Product/UpdateProducts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Failed to update Product. Status: ${response.status}`
            );
          }
          this.fetchProductDetails();
          this.editing = false;
          this.editProductId = null;
          this.showToastMessage("Product updated successfully");
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          this.showToastMessage("Error updating product");
        });
    },
  },
  components: {
    DeleteProduct,
    EditProduct,
    ProductDetailsPopup,
    PageHeader,
    PageFooter,
  },
};
</script>

<style scoped>
.mb-3 {
  display: block;
  justify-content: space-between;
}
.product-list-page container mt-3 .right-side input[type="text"],
.right-side input[type="number"] {
  width: calc(100% - 20px); /* Decrease the width by 20 pixels */
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

.product-item:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background-color: #12b53e; /* Dark green background color */
}

.product-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

.search {
  display: flex;
  align-items: center;
  width: 100%;
}
.btn-add-gen {
  align-items: center;
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

  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
  overflow-y: auto; /* Add this line */
  max-height: 80%;
  display: grid;
  grid-template-columns: auto 1fr; /* Divide into two columns, first column auto-sized */
}

.title-container {
  margin: auto; /* Center horizontally */
}

.left-side {
  grid-column: 1 / span 1; /* Span one column */
  display: flex;
  align-items: center; /* Center vertically */
  background-color: #006400; /* Dark green color */
  padding: 30px; /* Add 20 pixels of padding to the top and bottom */
}

.right-side {
  grid-column: 2 / span 1; /* Span one column */
  background-color: #90ee90; /* Light green color */
  position: relative; /* Enable relative positioning */

  padding-top: 20px; /* Add space at the top */
  padding-bottom: 20px; /* Add space at the bottom */
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
.btn-danger {
  background-color: #dc3545;
  color: #fff;
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
