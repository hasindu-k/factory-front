<template>
    <div class="update-salary">
      <h1>Update Employee Salary</h1>
  
      <form @submit.prevent="updateEmployeeSalary">
        <label for="employeeId">Employee ID:</label>
        <input id="employeeId" v-model="salaryUpdate.employeeId" type="text" required>
  
        <label for="newSalary">New Salary:</label>
        <input id="newSalary" v-model="salaryUpdate.newSalary" type="number" required>
  
        <button type="submit">Update Salary</button>
      </form>
  
      <p>{{ successMessage }}</p>
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'UpdateEmployeeSalary',
    data() {
      return {
        salaryUpdate: {
          employeeId: '',
          newSalary: null,
        },
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      updateEmployeeSalary() {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', 'http://localhost:5236/UpdateEmployeeSalary', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.successMessage = 'Employee salary updated successfully!';
              this.errorMessage = '';
            } else {
              this.successMessage = '';
              this.errorMessage = 'Failed to update employee salary. Please try again.';
            }
            this.salaryUpdate = {
              employeeId: '',
              newSalary: null,
            };
          }
        };
        xhr.send(JSON.stringify(this.salaryUpdate));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  