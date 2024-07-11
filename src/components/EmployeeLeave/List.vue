<template>
    <PageHeader/>
    <div class="text">Employee List</div>
    <div class="table-container">
        <div class="search-bar">
            <input type="text" class="form-control" placeholder="Search Leave" v-model="searchTerm"
                @input="searchProducts" />
            <button type="button" class="btn btn-primary">Search</button>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Department ID</th>
                    <th scope="col">Leave Type</th>
                    <th scope="col">No of Days</th>
                </tr>
            </thead>
            <tbody v-if="filteredEmployees.length > 0">
                <tr v-for="(employee, index) in filteredEmployees" :key="index">
                    <td>{{ employee.employeeId }}</td>
                    <td>{{ employee.departmentId }}</td>
                    <td>{{ employee.leave_type }}</td>
                    <td>{{ employee.noofLeaveDays }}</td>
                    <td>
                        <button type="button" class="btn btn-success" style="background-color: purple;" @click="editEmployee(employee)">
                            Edit
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteEmployee(employee)">
                            Delete
                        </button>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="6">No matching Leave found.</td>
                </tr>
            </tbody>
        </table>

        <div v-if="editing">
            <EditEmployee :employee="employeeToEdit" @update="updateEmployee" @cancel="cancelEdit">
            </EditEmployee>
        </div>

        <button type="button" class="btn btn-primary" @click="generateReport">Generate Report</button>
        <button type="button" class="btn btn-primary" @click="addEmployeeClicked">ADD Employee</button>

    </div>
    <!-- table-container -->
</template>

<script>
import PageHeader from "../PageHeaderManager.vue";
import EditEmployee from "./UpdateEmployeeLeave.vue";

export default {
    name: "EmployeeList",
    data() {
        return {
            employees: [],
            editing: false,
            employeeToEdit: null,
            searchTerm: "",
        };
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter((employee) =>
                employee.employeeId.toString().includes(this.searchTerm.toString())
            );
        }

    },
    methods: {
        addEmployeeClicked() {
            this.$emit('addEmployeeClicked');
            this.$router.push('/employee-leave-form'); 
        },
        generateReport() {
            // Get the current date and time
            const currentDateTime = new Date().toLocaleString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
            });

            const companyName = "URUWELA TEA FACTORY";
            const companyAddress = "Uruwela Tea Factory, Akuressa, Matara";

            // Logo URL
            const logoUrl = "https://example.com/logo.png"; // Replace this URL with the actual URL of your logo image

            // Create the header section
            let headerHtml = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; float: left; margin-right: 20px;">
      <div style="float: left;">
        <h1>Employee Report</h1>
        <p>Date: ${currentDateTime}</p>
        <h2>${companyName}</h2>
        <p>${companyAddress}</p>
      </div> 
      <div style="clear: both;"></div>
    </div>
  `;

            // Create a table header row
            let tableHtml = `${headerHtml}
    <div style="width: 100%;">
      <table border="1">
        <tr>
            <th style="width: 20%; text-align: center;">Employee ID</th>
            <th style="width: 20%; text-align: center;">Department ID</th>
            <th style="width: 20%; text-align: center;">Leave Type</th>
            <th style="width: 20%; text-align: center;">No of Days</th>
        </tr>
    `;

            // Iterate through all employees and add each employee's details to the table
            this.employees.forEach((employee) => {
                tableHtml += `
        <tr>
            <td style="text-align: center;">${employee.employeeId}</td>
            <td style="text-align: center;">${employee.departmentId}</td>
            <td style="text-align: center;">${employee.leave_type}</td>
            <td style="text-align: center;">${employee.noofLeaveDays}</td>
        </tr>
      `;
            });

            // Close the table tag and the div wrapping the table
            tableHtml += `</table></div>`;

            // Convert HTML table to PDF
            const opt = {
                margin: 1,
                filename: `EmployeeReport_${currentDateTime.replace(/[^\w\s]/gi, "_")}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
            };

            // Use html2pdf library to convert HTML to PDF
            window.html2pdf().set(opt).from(tableHtml).save();
        }
        ,
        async fetchEmployees() {
            try {
                const response = await fetch(
                    "http://localhost:5154/api/Leave/GetAllEmployeeLeaves"
                );
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch employees. Status: ${response.status}`
                    );
                }

                const responseData = await response.json();
                this.employees = responseData.filter(
                    (employee) => !employee.deleted
                );
            } catch (error) {
                console.error("Error fetching employees:", error);
                this.error = "Error fetching employees. Please try again.";
            }
        },

        editEmployee(employee) {
            this.editing = true;
            this.employeeToEdit = employee;
        },
        cancelEdit() {
            this.editing = false;
            this.employeeToEdit = null;
        },
        async updateEmployee(updatedEmployee) {
            try {
                const response = await fetch(
                    "http://localhost:5154/api/Leave/UpdateEmployeeLeave",
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedEmployee),
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to update employee. Status: ${response.status}`
                    );
                }

                console.log("Updated Employee:", updatedEmployee);

                this.fetchEmployees();
                this.cancelEdit();
            } catch (error) {
                console.error("Error updating employee:", error);
                // Handle error, display error message, etc.
            }
        },
        async deleteEmployee(employee) {
            try {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this employee's leave?"
                );
                if (!confirmed) return; // If user cancels, do nothing

                const response = await fetch(
                    `http://localhost:5154/api/Leave/DeleteEmployeeLeave/${employee.employeeId}`,
                    {
                        method: "DELETE",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Failed to delete employee. Status: ${response.status}`
                    );
                }

                this.fetchEmployees(); // Refresh the list after deletion
            } catch (error) {
                console.error("Error deleting employee:", error);
                // Handle error, display error message, etc.
            }
        },

    },
    mounted() {
        this.fetchEmployees();
    },
    components: {
        // EditList,
      EditEmployee,
        PageHeader,
    },
};
</script>

<style scoped>
body {
    margin-top: 10px;
}

.text {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 30px;
    color: black;
}

.btn {
    margin-right: 10px;
}

.search-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

table {
    border-collapse: collapse;
    margin-left: 50px;
    width: 1350px;
    align-items: center;
}

tr, th, td{
  border: 1px solid black;  
}


</style>