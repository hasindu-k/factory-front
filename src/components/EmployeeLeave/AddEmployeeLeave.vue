<template>
  <PageHeader/>
  <div class="add-leave" style="margin-top: 100px;">
    <h1>Add Employee Leave</h1>

    <form @submit.prevent="addEmployeeLeave">
      <div>
        <label for="employeeId">Employee ID:</label>
        <input id="employeeId" v-model="newLeave.employeeId" type="text" required>

      </div>

      <label for="leaveType">Leave Type:</label>
      <select id="leaveType" v-model="newLeave.leaveType" required>
        <option value="Annual">Annual</option>
        <option value="Sick">Sick</option>
        <option value="Maternity">Maternity</option>
        <!-- Add other leave types as needed -->
      </select>

      <label for="endDate">Department</label>
      <input id="endDate" v-model="newLeave.departmentId" type="text" required>

      <label for="endDate">Number of Days</label>
      <input id="endDate" v-model="newLeave.days" type="text" required>

      <button type="submit" @click="submitForm">Add Leave</button>
      <br><br>
      <button type="submit" @click="navigateToList">Back to List</button>
    </form>

    <p>{{ successMessage }}</p>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
import PageHeader from '../PageHeaderManager.vue';

export default {
  components: {
      PageHeader
    },
  name: 'AddEmployeeLeave',
  data() {
    return {
      newLeave: {
        employeeId: '',
        leaveType: '',
        departmentId: '',
        days: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    submitForm() {
      this.submitFormData();
      this.$emit('addLeaveClicked');
    },
    navigateToList() {
      this.$router.push('/employee-leave-list'); 
    },
    async submitFormData() {
      try {
        const formData = {
          EmployeeId: this.newLeave.employeeId,
          DepartmentId: this.newLeave.departmentId,
          NoofLeaveDays: this.newLeave.days,
          leave_type: this.newLeave.leaveType
        };

        console.log(formData)

        const response = await fetch("http://localhost:5154/api/Leave/AddEmployerLeave", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error(`Failed to add Leave. Status: ${response.status}`);
        }

        alert("Leave added successfully!");
        console.error("Leave added successfully!");

        // Reset form fields after successful submission
        // Add your code here to reset form fields if needed

      } catch (error) {
        console.error("Error adding leave:", error);
        alert("Error adding leave. Please try again.");
      }
      // this.$emit('addEmployeeClicked');
    },

    navigateToView() {

    },


  }
};
</script>


<style scoped>
/* Add your component-specific styles here */

.add-leave {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.add-leave h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.add-leave form label {
  display: block;
  margin-bottom: 5px;
}

.add-leave form input,
.add-leave form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

.add-leave form button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.add-leave form button:hover {
  background-color: #0056b3;
}

.add-leave p {
  margin-top: 15px;
  text-align: center;
  font-size: 16px;
}

.add-leave p.success {
  color: green;
}

.add-leave p.error {
  color: red;
}
</style>