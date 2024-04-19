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
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  width: 100%;
}

.product-details {
  display: flex;
  align-items: center;
}

.product-image {
  flex: 1;
}

.product-image img {
  width: 100%;
  height: auto;
}

.product-info {
  flex: 2;
  padding-left: 20px;
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
}

.btn-secondary {
  background-color: #ccc;
  color: #333;
  border: none;
}

.btn-secondary:hover {
  background-color: #999;
}
</style>