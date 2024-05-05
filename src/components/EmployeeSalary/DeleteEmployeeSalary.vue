<template>
    <div class="delete-salary">
      <h1>Delete Employee Salary</h1>
  
      <form @submit.prevent="deleteEmployeeSalary">
        <label for="employeeId">Employee ID:</label>
        <input id="employeeId" v-model="employeeIdToDelete" type="text" required>
  
        <button type="submit">Delete Salary</button>
      </form>
  
      <p>{{ successMessage }}</p>
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DeleteEmployeeSalary',
    data() {
      return {
        employeeIdToDelete: '',
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      deleteEmployeeSalary() {
        const xhr = new XMLHttpRequest();
        xhr.open('DELETE', 'http://localhost:5236/DeleteEmployeeSalary/' + this.employeeIdToDelete, true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.successMessage = 'Employee salary deleted successfully!';
              this.errorMessage = '';
            } else {
              this.successMessage = '';
              this.errorMessage = 'Failed to delete employee salary. Please try again.';
            }
            this.employeeIdToDelete = '';
          }
        };
        xhr.send();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  