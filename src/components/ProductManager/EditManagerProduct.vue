<template>
  <div class="edit-product-modal">
    <div class="edit-product">
      <!-- Left side for title -->
      <div class="left-side">
        <h2 class ="edit">Edit Product</h2>
      </div>

      <!-- Right side for product details -->
      <div class="right-side">
        <form @submit.prevent="update">
          <!-- Product Image -->
          <div class="form-group">
            <label for="editedProductPhoto">Product Image:</label>
            <!-- Display product photo as an image -->
            <img :src="editedProduct.productPhoto" alt="Product Image" style="max-width: 100%; height: auto;">
            <!-- Input field to update the product photo -->
            <input type="file" @change="handlePhotoChange" class="form-control" accept="image/*" />
          </div>

          <!-- Product Name -->
          <div class="form-group">
            <label for="editedProductName">Product Name:</label>
            <input v-model="editedProduct.productName" type="text" class="form-control" required />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="editedDescription">Description:</label>
            <input v-model="editedProduct.pDescription" type="text" class="form-control" required />
          </div>

          <!-- Available Stock -->
          <div class="form-group">
            <label for="editedAvaiStock">Available Stock:</label>
            <input v-model="editedProduct.avaiStock" type="number" @keydown.up.prevent="increaseStock" @keydown.down.prevent="decreaseStock" class="form-control" required />
            <div v-if="avaiStockError" class="alert alert-danger mt-2">{{ avaiStockError }}</div>
          </div>

          <!-- Price -->
          <div class="form-group">
            <label for="editedPrice">Price:</label>
            <input v-model="editedProduct.price" type="number" class="form-control" required />
          </div>

          <!-- Save and Cancel buttons -->
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Save Product</button>
            <button type="button" @click="cancelEdit" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
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
      avaiStockError: null, // corrected capitalization
    };
  },
  mounted() {
    const input = document.querySelector('.form-control'); // Select the input field

    // Add event listeners for up and down arrow keys
    input.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowUp') {
        this.increaseStock();
      } else if (event.key === 'ArrowDown') {
        this.decreaseStock();
      }
    });
  },
  methods: {
    increaseStock() {
      this.editedProduct.avaiStock++;
    },
    decreaseStock() {
      if (this.editedProduct.avaiStock > 0) {
        this.editedProduct.avaiStock--;
      }
    },
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
  height: 80%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit{
  text-align: center;
}
.edit-product {
  background: #0cd11d;

  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
  transform: translateY(0%);
  display: flex;
  justify-content: space-between;
}
.left-side {
  grid-column: 1 / span 1; /* Span one column */
  display: flex;
  align-items: center; /* Center vertically */
  background-color: #006400; /* Dark green color */
  padding: 30px ; /* Add 20 pixels of padding to the top and bottom */
  width : 150px;
  }

  /* Right side styling */
  .right-side {
    grid-column: 2 / span 1; /* Span one column */
  background-color: #90ee90; /* Light green color */
  position: relative; /* Enable relative positioning */
  
  padding-top: 20px; /* Add space at the top */
  padding-bottom: 20px; /* Add space at the bottom */
  }

/* Form elements */
.edit-product form {
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
.right-side input[type="number"]
.edit-product input[type="file"],
.edit-product textarea,
.edit-product select {
  width: calc(100% - 90px);
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