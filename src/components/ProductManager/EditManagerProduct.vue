<template>
    <div class="edit-product-modal">
      <div class="edit-product">
        <h2>Edit Product</h2>
        <form @submit.prevent="update">
  
          <div class="form-group">
              <label for="editedProductPhoto">Product Image:</label>
  <!-- Display product photo as an image -->
              <img :src="editedProduct.productPhoto" alt="Product Image" style="max-width: 100%; height: auto;">
  <!-- Input field to update the product photo -->
              <input type="file" @change="handlePhotoChange" class="form-control" accept="image/*" />
          </div>

  
          <div class="form-group">
            <label for="editedProductName">Product Name:</label>
            <input
              v-model="editedProduct.productName"
              class="form-control"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="editedDescription">Description:</label>
            <input
              v-model="editedProduct.pDescription" 
              type="text" 
              class="form-control"
              required
            />
          </div>
  
          <div class="form-group">
            <label for="editedAvaiStock">Available Stock:</label>
            <input
              v-model="editedProduct.avaiStock"
              class="form-control"
              required
            />
            <div v-if="avaiStockError" class="alert alert-danger mt-2">
              {{ avaiStockError }}
            </div>
          </div>
  
          <div class="form-group">
            <label for="editedPrice">Price:</label>
            <input v-model="editedProduct.price" class="form-control" required /> <!-- corrected -->
          </div>
  
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save Product</button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
    </div>
  </template>
  
  <script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedProduct: { ...this.product },
      AvaiStockError: null,
    };
  },
  methods: {
    update() {
      // If a new product photo is uploaded, update the edited product with the new photo
      if (this.newProductPhoto) {
        this.editedProduct.productPhoto = URL.createObjectURL(this.newProductPhoto);
      }
      this.$emit("update", this.editedProduct);
    },
    cancelEdit() {
      this.$emit("cancel");
    },
    handlePhotoChange(event) {
      // Update newProductPhoto with the uploaded file
      this.newProductPhoto = event.target.files[0];
    },
  },
};
</script>

<style scoped>
/* Modal background */
.edit-product-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Edit product form container */
.edit-product {
  background: #0cd11d;
  height: 500px;
  width: 400px; /* White background */
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Drop shadow for depth */
  max-width: 1000px; /* Limit width for better readability */
}

/* Form elements */
.edit-product form {
  /* Center align the form elements */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.edit-product .form-group {
  margin-bottom: 15px;
  width: 100%;
}

.edit-product label {
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
}

.edit-product textarea {
  width: calc(100% - 20px); /* Adjusted to leave some space for padding */
  padding: 8px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  text-align: center; /* Center align the text */
}


.edit-product input[type="text"],
.edit-product textarea,
.edit-product select {
  width: calc(100% - 20px);
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

/* Submit button */
.edit-product button[type="submit"],
.edit-product button[type="button"] {
  width: auto;
  padding: 10px 20px;
  margin: 5px;
  background-color: rgba(135, 16, 215, 0.904); /* Green background */
  color: #fff; /* White text */
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 10px;
}

.edit-product button[type="submit"]:hover,
.edit-product button[type="button"]:hover {
  background-color: #0b0be2c7; /* Darker green on hover */
}

/* Close button */
.edit-product .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #999;
}

/* Error message */
.edit-product .alert {
  margin-top: 10px;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
}

</style>