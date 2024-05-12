<template>
  <div class="delete-leave">
    <h1>Delete Employee Leave</h1>

    <form @submit.prevent="deleteEmployeeLeave">
      <label for="leaveId">Leave ID:</label>
      <input id="leaveId" v-model="leaveIdToDelete" type="text" required>

      <button type="submit">Delete Leave</button>
    </form>

    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'DeleteEmployeeLeave',
  data() {
    return {
      leaveIdToDelete: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    deleteEmployeeLeave() {
      // Assuming you have an API endpoint to delete the leave based on its ID
      // You can replace the URL and HTTP method with your actual backend API endpoint
      fetch(`http://localhost:5154/api/Leave/DeleteEmployeeLeave/${this.leaveIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if required
        },
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Leave deleted successfully';
            this.errorMessage = ''; // Clear any previous error messages
            this.leaveIdToDelete = ''; // Clear the input field after successful deletion
          } else {
            throw new Error('Failed to delete leave');
          }
        })
        .catch(error => {
          console.error('Error deleting leave:', error);
          this.errorMessage = 'Failed to delete leave. Please try again later.';
          this.successMessage = ''; // Clear any previous success messages
        });
    }
  }
};
</script>

<style scoped>
/* Add your component-specific styles here */
.delete-leave {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.delete-leave h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.delete-leave form label {
  display: block;
  margin-bottom: 5px;
}

.delete-leave form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.delete-leave form button {
  width: 100%;
  padding: 10px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.delete-leave form button:hover {
  background-color: #c82333;
}

.delete-leave p {
  margin-top: 15px;
  text-align: center;
  font-size: 16px;
}

.delete-leave p.success {
  color: green;
}

.delete-leave p.error {
  color: red;
}
</style>
