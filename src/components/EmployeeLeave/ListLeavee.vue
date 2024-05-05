<template>
    <div class="container mt-3">
        <div class="index-page">
            <h1 class="mb-4">Employee List</h1>
            <div class="mb-3">
                <input type="text" class="form-control" id="search" placeholder="SEARCH EMPLOYEES" v-model="searchTerm"
                    @input="searchEmployees" />
            </div>
            <button class="btn btn-primary mb-3" style="margin-left: 0" @click="openAddEmployeeForm">
                Add Employee
            </button>

            <button class="btn btn-primary mb-3" style="margin-left: 0" @click="generateReport">
                Generate Report
            </button>

            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th>Employee ID</th>
                        <th>Department ID</th>
                        <th>Leave Type</th>
                        <th>No of Days</th>
                    </tr>
                </thead>
                <tbody v-if="filteredEmployees.length > 0">
                    <tr v-for="(employee, index) in filteredEmployees" :key="index">
                        <td>{{ employee.employee_Id }}</td>
                        <td>{{ employee.department_id }}</td>
                        <td>{{ employee.leave_type }}</td>
                        <td>{{ employee.NoOfDays }}</td>

                        <td>
                            <button class="btn btn-primary btn-sm" @click="editEmployee(employee)">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm" @click="deleteEmployee(employee)">
                                Delete
                            </button>
                        </td>
                    </tr>

                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6">No Matching employees</td>
                    </tr>
                </tbody>
            </table>

            <div v-if="editing">
                <EditList :employee="employees.find((employee) => employee.employee_id === editEmployeeId)"
                    @update="updateEmployee" @cancel="cancelEdit"></EditList>
            </div>

            <DeleteLeave v-if="selectedEmployeeForDeletion" :employee="selectedEmployeeForDeletion"
                @delete="performDelete" @cancel="cancelDelete" />

            <!-- <div v-if="isAddEmployeeFormVisible" class="modal-overlay">
                <div class="custom-modal">
                    <h2 class="mb-4">Add New Employee</h2>

                    <div class="form-group">
                        <label for="employeeName">Name:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="employeeName"
                        v-model="newEmployee.employeeName"
                        />
                        <div v-if="employeeNameError" class="alert alert-danger mt-2">
                        {{ employeeNameError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="employeeNIC">NIC:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="employeeNIC"
                        v-model="newEmployee.employeeNIC"
                        />
                        <div v-if="nICError" class="alert alert-danger mt-2">
                        {{ nICError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="employeeEmail">Email:</label>
                        <input
                        type="email"
                        class="form-control"
                        id="employeeEmail"
                        v-model="newEmployee.employeeEmail"
                        />
                        <div v-if="employeeEmailError" class="alert alert-danger mt-2">
                        {{ employeeEmailError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="employeePhone">Phone number:</label>
                        <input
                        type="tel"
                        class="form-control"
                        id="employeePhone"
                        v-model="newEmployee.employeePhone"
                        />
                        <div v-if="employeePhoneError" class="alert alert-danger mt-2">
                        {{ employeePhoneError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="employeePassword">Password:</label>
                        <input
                        type="password"
                        class="form-control"
                        id="employeePassword"
                        v-model="newEmployee.employeePassword"
                        />
                        <div v-if="employeePasswordError" class="alert alert-danger mt-2">
                        {{ employeePasswordError }}
                        </div>
                    </div>

                    <button class="btn btn-success" @click="addEmployee">Add Employee</button>
                    <button class="btn btn-secondary" @click="cancelAddEmployee">
                        Cancel
                    </button>
                </div>    
            </div> -->
            <!-- end of invisible Employee form  -->
        </div>
    </div>
</template>


<script>
import EditList from "../EmployeeLeave/UpdateEmployeeLeave.vue"
import DeleteLeave from "../EmployeeLeave/DeleteLeave.vue";

export default {
    name: "ListLeavee",
    data() {
        return {
            employees: [],
            editing: false,
            editEmployeeId: null,
            error: null,
            selectedEmployeeForDeletion: null,
            isAddEmployeeFormVisible: false,
            newEmployee: {
                employeeID: "",
                employeeName: "",
                employeeNIC: "",
                employeeEmail: "",
                employeePhone: "",
                employeeType: "",
                employeePassword: "",
            },


            employeeNameError: null,
            nICError: null,
            employeeEmailError: null,
            employeePhoneError: null,
            employeeTypeError: null,
            employeePasswordError: null,
            searchTerm: "",
        };
    },
    mounted() {
        this.fetchEmployees();
    },
    computed: {
        filteredEmployees() {
            return this.employees.filter((employee) => {
                const searchLower = this.searchTerm.toLowerCase();
                return (
                    employee &&
                    employee.employeeName &&
                    employee.employeeName.toLowerCase().includes(searchLower)
                );
            });
        },
    },
    methods: {

        searchEmployees() {
            this.filteredEmployees = this.employees.filter((employee) => {
                const searchLower = this.searchTerm.toLowerCase();
                return employee.employeeName.toLowerCase().includes(searchLower);
            });
        },
        async fetchEmployees() {
            try {
                const response = await fetch("http://localhost:5030/api/Leave/GetAllEmployeeLeaves");
                if (!response.ok) {
                    throw new Error(
                        `Failed to update course. Status: ${response.status}`
                    );
                }

                const responseData = await response.json();
                console.log(responseData);
                this.employees = responseData.filter((employee) => !employee.deleted);
            } catch (error) {
                console.error("Error fetching employees:", error);
                this.error = "Error fetching employees. Please try again.";
            }
        },
        editEmployee(employee) {
            this.editing = true;
            this.editEmployeeId = employee.employeeID;
        },

        cancelEdit() {
            this.editing = false;
            this.editEmployeeId = null;
        },

        updateEmployee(updatedEmployees) {
            const updatedEmployeesData = {
                employeeID: updatedEmployees.employeeID,
                employeeName: updatedEmployees.employeeName,
                employeeNIC: updatedEmployees.employeeNIC,
                employeeEmail: updatedEmployees.employeeEmail,
                employeeType: updatedEmployees.employeeType,
                employeePassword: updatedEmployees.employeePassword,
            };

            fetch("http://localhost:5207/api/User/UpdateEmployees", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployeesData),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(
                            `Failed to update employee. Status: ${response.status}`
                        );
                    } else {
                        this.fetchEmployees();
                    }
                    return response.json();
                })
                .then()
                .catch((error) => {
                    console.error("Error editing employee:", error);
                });

            this.editing = false;
            this.editEmployeeId = null;
        },
        deleteEmployee(employeeId) {
            this.selectedEmployeeForDeletion = this.employees.find(
                (employee) => employee.employeeId === employeeId
            );
        },
        async performDelete(employeeId) {
            const updatedEmployees = this.employees.filter(
                (employee) => employee.employeeId !== employeeId
            );
            this.employees = updatedEmployees;

            try {
                await this.deleteEmployeeOnServer(employeeId);
            } catch (error) {
                console.error("Error deleting employee on the server:", error);
            }

            this.selectedEmployeeForDeletion = null;
        },
        async deleteEmployeeOnServer(employeeId) {
            const url = `http://localhost:5207/api/User/DeleteEmployee?employeeId=${employeeId}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Failed to delete employee on the server. Status: ${response.status}`
                );
            }
        },
        cancelDelete() {
            this.selectedEmployeeForDeletion = null;
        },
        openAddEmployeeForm() {
            this.isAddEmployeeFormVisible = true;
        },

        validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        },

        validatePhone(phone) {
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        },

        validateForm() {
            let isValid = true;

            if (!this.validateEmail(this.newEmployee.employeeEmail)) {
                this.employeeEmailError = "Invalid email address.";
                isValid = false;
            }

            if (!this.validatePhone(this.newEmployee.employeePhone)) {
                this.employeePhoneError = "Invalid phone number.";
                isValid = false;
            }

            return isValid;
        },
        addEmployee() {
            // Reset error messages

            this.employeeNameError = null;
            this.nICError = null;
            this.employeeEmailError = null;
            this.employeePhoneError = null;
            this.employeeTypeError = null;
            this.employeePasswordError = null;
            // Validate required fields


            if (!this.newEmployee.employeeName) {
                this.employeeNameError = "Employee name is required.";
            }

            if (!this.newEmployee.employeeNIC) {
                this.nICError = "Employee NIC is required.";
            }

            if (!this.newEmployee.employeeEmail) {
                this.employeeEmailError = "Employee email is required.";
            }

            if (!this.newEmployee.employeeType) {
                this.cusAddressErrorEmployeeTypeError = "Employee type is required.";
            }

            if (!this.newEmployee.employeePassword) {
                this.employeePasswordError = "Employee password is required.";
            }

            if (!this.newEmployee.employeeName || !this.newEmployee.employeeNIC || !this.newEmployee.employeeEmail || !this.newEmployee.employeeType || !this.newEmployee.employeePassword) {
                return;
            }

            // Proceed with adding the course
            const newEmployeeData = {
                employeeID: this.newEmployee.employeeID,
                employeeName: this.newEmployee.employeeName,
                employeeNIC: this.newEmployee.employeeNIC,
                employeeEmail: this.newEmployee.employeeEmail,
                employeeType: this.newEmployee.employeeType,
                employeePassword: this.newEmployee.employeePassword,
            };

            fetch("http://localhost:5236/PostCourses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newEmployeeData),
            })
                .then((response) => {
                    if (!response.ok) {
                        `throw new Error(Failed to add employee. Status: ${response.status})`;
                    } else {
                        this.fetchEmployees();
                    }
                    return response.json();
                })
                .then((newEmployee) => {
                    this.courses.push(newEmployee);

                    this.newEmployee = {
                        employeeID: "",
                        employeeName: "",
                        employeeNIC: "",
                        employeeEmail: "",
                        employeeType: "",
                        employeePassword: "",
                    };
                    this.isAddEmployeeFormVisible = false;
                })
                .catch((error) => {
                    console.error("Error adding employee:", error);
                });
        },
        cancelAddEmployee() {
            this.newEmployee = {
                employeeID: "",
                employeeName: "",
                employeeNIC: "",
                employeeEmail: "",
                employeeType: "",
                employeePassword: "",
            };

            this.isAddEmployeeFormVisible = false;
        },
        generateReport() {
            // Get the current date and time
            const currentDateTime = new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
            });

            const companyName = 'URUWELA TEA FACTORY';
            const companyAddress = 'Uruwela Tea Factory, Akuressa, Galle';

            // Logo URL
            const logoUrl = 'https://example.com/logo.png'; // Replace this URL with the actual URL of your logo image

            // Create the header section
            let headerHtml = `
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; float: left; margin-right: 20px;">
    <div style="float: left;">
      <h1>LEAVE REPORT</h1>
      <p>Date: ${currentDateTime}</p>
      <h2>${companyName}</h2>
      <p>${companyAddress}</p>
    </div> 
    <div style="clear: both;"></div>
  </div>
`;

            // Create a table header row
            let tableHtml = `
    ${headerHtml}
    <table border="1">
      <tr>
        <th style="width: 15%; text-align: center;">Employee ID</th>
        <th style="width: 15%; text-align: center;">Employee Name</th>
        <th style="width: 15%; text-align: center;">Phone Number</th>
        <th style="width: 15%; text-align: center;">Department ID</th>
        <th style="width: 15%; text-align: center;">Hours Worked</th>        
        <th style="width: 15%; text-align: center;">Total Leave Days</th>
        <th style="width: 15%; text-align: center;">Remaining Leave Days</th>


      </tr>
  `;

            // Iterate through all products and add each product's details to the table
            this.employees.forEach(employee => {
                tableHtml += `
      <tr>
        <td style="text-align: center;">${employee.employeeId}</td>
        <td style="text-align: center;">${employee.employeeName}</td>
        <td style="text-align: center;">${employee.phoneNumber}</td>
        <td style="text-align: center;">${employee.departmentId}</td>
        <td style="text-align: center;">${employee.hoursWorked}</td>
        <td style="text-align: center;">${employee.totalLeaveDays}</td>
        <td style="text-align: center;">${employee.remainingLeaveDays}</td>

      </tr>
    `;
            });

            // Close the table tag
            tableHtml += '</table>';

            // Convert HTML table to PDF
            const opt = {
                margin: 1,
                filename: `LeaveReport_${currentDateTime.replace(/[^\w\s]/gi, '_')}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            // Use html2pdf library to convert HTML to PDF
            window.html2pdf().set(opt).from(tableHtml).save();
        },
    },
    components: {
        DeleteLeave,
        EditList
    },

};
</script>

<style scoped>
.modal-overlay {
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

.custom-modal {
    background: white;
    padding: 10px;
    width: 70%;
    border-radius: 4px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    border: 1px solid #ddd;
    padding: 20px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

.error-message {
    color: red;


}

.container {
    max-width: 800px;
    margin: 0 auto;
}

.index-page {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
}

.index-page h1 {
    font-size: 28px;
    margin-bottom: 20px;
    text-align: center;
}

.index-page input[type="text"],
.index-page input[type="email"],
.index-page input[type="tel"],
.index-page input[type="password"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

.index-page .form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
}

.index-page button {
    margin-right: 10px;
}

.index-page .table {
    width: 100%;
    border-collapse: collapse;
}

.index-page .table th,
.index-page .table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
}

.index-page .btn-sm {
    padding: 5px 10px;
    font-size: 14px;
}

.index-page .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.index-page .custom-modal {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 400px;
}

.index-page .form-group {
    margin-bottom: 20px;
}

.index-page .alert {
    margin-top: 5px;
}
</style>
