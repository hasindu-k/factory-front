<template>
  <div class="delete-product-modal">
    <div class="delete-product-content">
      <h2>Delete Product</h2>
      <p v-if="product">Are you sure you want to delete the product "{{ product.productName }}"?</p>
      <div class="delete-buttons">
        <button @click="confirmDelete" class="btn btn-danger">Yes, Delete</button>
        <button @click="cancelDelete" class="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
  },
  methods: {
    confirmDelete() {
      if (this.product) {
        this.$emit('delete', this.product.productId);
      }
    },
    cancelDelete() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.delete-product-modal {
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

.delete-product-content {
  background: #15c146;
  padding: 20px;
  border-radius: 8px;
}

.delete-buttons {
  margin-top: 20px;
  text-align: right;
}
.btn {
    padding: 10px 20px;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 10px; /* Add margin between buttons */
  }

  .btn-danger {
    background-color: #dc3545;
    color: #fff;
  }

  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
  }

  .btn:hover {
    opacity: 0.8;
  }
</style>
