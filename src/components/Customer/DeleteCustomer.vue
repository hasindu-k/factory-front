<template>
    <div class="delete-course-modal">
      <div class="delete-course-content">
        <h2>Delete Customer</h2>
        <p v-if="customer">Are you sure you want to delete the Customer "{{ customer.cusName }}"?</p>
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
        customer: {
        type: Object,
        default: null,
      },
    },
    methods: {
      confirmDelete() {
        if (this.customer) {
          this.$emit('delete', this.customer.cusID);
        }
      },
      cancelDelete() {
        this.$emit('cancel');
      },
    },
  };
  </script>
  
  <style scoped>
  .delete-course-modal {
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
  
  .delete-course-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
  }
  
  .delete-buttons {
    margin-top: 20px;
    text-align: right;
  }
  </style>
  