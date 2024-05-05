<template>
    <div class="add-leave">
      <h1>Add Employee Leave</h1>
  
      <form @submit.prevent="addEmployeeLeave">
        <label for="employeeId">Employee ID:</label>
        <input id="employeeId" v-model="newLeave.employeeId" type="text" required>
  
        <label for="leaveType">Leave Type:</label>
        <select id="leaveType" v-model="newLeave.leaveType" required>
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Maternity">Maternity</option>
          <!-- Add other leave types as needed -->
        </select>
  
        <label for="startDate">Start Date:</label>
        <input id="startDate" v-model="newLeave.startDate" type="date" required>
  
        <label for="endDate">End Date:</label>
        <input id="endDate" v-model="newLeave.endDate" type="date" required>
  
        <button type="submit">Add Leave</button>
      </form>
  
      <p>{{ successMessage }}</p>
      <p>{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddEmployeeLeave',
    data() {
      return {
        newLeave: {
          employeeId: '',
          leaveType: '',
          startDate: '',
          endDate: '',
        },
        successMessage: '',
        errorMessage: '',
      };
    },
    methods: {
      addEmployeeLeave() {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5236/AddEmployeeLeave', true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.successMessage = 'Leave added successfully!';
              this.errorMessage = '';
            } else {
              this.successMessage = '';
              this.errorMessage = 'Failed to add the leave. Please try again.';
            }
            this.newLeave = {
              employeeId: '',
              leaveType: '',
              startDate: '',
              endDate: '',
            };
          }
        };
        xhr.send(JSON.stringify(this.newLeave));
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  