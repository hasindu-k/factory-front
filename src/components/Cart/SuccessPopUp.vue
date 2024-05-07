<template>
  <div class="success-popup">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Successfully saved!</h2>
      </div>
      <div class="modal-body">
        <p>{{ message }}</p>
        <button @click="closePopup" class="close-button">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  methods: {
    closePopup() {
      this.$emit('close');
    }
  }
}
</script>

<style scoped>
/* Modal content styles */
.success-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #15c146; /* Change background color to match the other popup */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3); /* Add shadow effect */
  max-width: 400px; /* Adjust the maximum width as needed */
  width: 100%; /* Ensure the modal content fills the container */
}

/* Modal header styles */
.modal-header {
  display: flex;
  justify-content: center; /* Center align the header */
  align-items: center;
  margin-bottom: 20px;
}

.modal-header h2 {
  font-size: 24px;
  color: #333;
}

/* Modal body styles */
.modal-body {
  text-align: center; /* Center align the body content */
}

.modal-body p {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px; /* Add some space below the message */
}

.close-button {
  background-color: #dc3545; /* Change button color to match the other popup */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  opacity: 0.8;
}
</style>
