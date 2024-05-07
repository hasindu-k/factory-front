<template>
  <div class="modal-overlay" @click="closePopup">
    <div class="custom-modal" @click.stop>
      <div class="product-details">
        <div class="product-image">
          <img :src="product.productPhoto" alt="Product Image">
          <h2>{{ product.productName }}</h2>
        </div>
        <div class="product-info">
          <div class="form-group">
            <label for="productId">Product ID:</label>
            <p>{{ product.productId }}</p>
          </div>
          <div class="form-group">
            <label for="pDescription">Product Description:</label>
            <p>{{ product.pDescription }}</p>
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <p>{{ product.price }}</p>
          </div>
          <div class="form-group">
            <label for="avaiStock">Available Stock:</label>
            <p>{{ product.avaiStock }}</p>
          </div>
          <button class="btn btn-secondary" @click="closePopup">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    product: Object
  },
  methods: {
    closePopup() {
      this.$emit('close');
    }
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
}

.custom-modal {
  background: #11e609;

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
  flex: 1;
  background-color: #006400;
}

.product-image img {
  width: 100%;
  height: 70%;
  
}

.product-image h2 {
  font-size: 24px;
  font-weight: bold;
  /* Add some space between the image and the product name */
  text-align: center; /* Center the product name */
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.product-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 20px;
}


.form-group {
  margin-bottom: 10px;
}

label {
  font-weight: bold;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  width : 40%;
  margin-left: auto;
  margin-right: auto;
}

.btn-secondary {
  background-color: #5066e1;
  color: #333;
  border: none;
}

.btn-secondary:hover {
  background-color: #999;
}
</style>
