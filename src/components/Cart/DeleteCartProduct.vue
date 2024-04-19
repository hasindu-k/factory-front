<template>
    <div class="delete-product-modal">
      <div class="delete-product-content">
        <h2>Delete Product</h2>
        <p v-if="cartProduct">Are you sure you want to delete the product "{{ cartProduct.productName }}"?</p>
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
      cartProduct: {
        type: Object,
        default: null,
      },
    },
    methods: {
      confirmDelete() {
        if (this.cartProduct) {
          this.$emit('delete', this.cartProduct.cId);
        }
      },
      cancelDelete() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Modal overlay styles */
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
    z-index: 999; /* Ensure the modal appears above other content */
  }

  /* Modal content styles */
  .delete-product-content {
    background: #15c146;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add shadow effect */
    max-width: 400px; /* Adjust the maximum width as needed */
    width: 100%; /* Ensure the modal content fills the container */
  }

  /* Title styles */
  .delete-product-content h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: #333;
    text-align: center;
  }

  /* Message paragraph styles */
  .delete-product-content p {
    font-size: 16px;
    color: #555;
    text-align: center;
    margin-bottom: 20px;
  }

  /* Delete buttons container styles */
  .delete-buttons {
    display: flex;
    justify-content: flex-end; /* Align buttons to the right */
  }

  /* Button styles */
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
