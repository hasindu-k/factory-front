<template>
    <div class="confirmation-popup">
      <p>{{ message }}</p>
      <button @click="confirmAction">Confirm</button>
      <button @click="cancelAction">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
   
    props: {
      message: String,
      onConfirm: Function,
      onCancel: Function
    },
    methods: {
      confirmAction() {
        this.onConfirm();
      },
      cancelAction() {
        this.onCancel();
      }
    }
  };
  </script>
  
  <style scoped>
  .confirmation-popup {
    background-color: white;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  