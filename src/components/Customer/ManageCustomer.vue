<template>
    <div class="container mt-3">
        <div class="index-page">
            <h1 class="mb-4">Customer List</h1>
            <div class="mb-3">
                <input
                    type="text"
                    class="form-control"
                    id="search"
                    placeholder="SEARCH CUSTOMERS"
                    v-model="searchTerm"
                    @input="searchCustomers"
                />
            </div>
            <button
            class="btn btn-primary mb-3"
            style="margin-left: 0"
            @click="openAddCustomerForm"
            >
            Add Customer
            </button>

            
            
            <button class="btn btn-primary mb-3 ml-2" @click="generateReport">
            Generate Report
            </button>
  
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Date of Birth</th>
                    <th>Address</th>
                    <th>Phone number</th>
                    <th>Password</th>
                    </tr>
                </thead>
                <tbody v-if="filteredCustomers.length > 0">
                    <tr v-for="customer in filteredCustomers" :key="customer.cusID">
                        <td>{{ customer.cusID }}</td>
                        <td>{{ customer.cusName }}</td>
                        <td>{{ customer.cusEmail }}</td>
                        <td>{{ customer.cusDOB }}</td>
                        <td>{{ customer.cusAddress }}</td>
                        <td>{{ customer.cusPhone }}</td>
                        <td>{{ customer.cusPassword }}</td>
                        
                        <td>
                            <button
                            class="btn btn-primary btn-sm"
                            @click="editCustomer(customer)"
                            >
                            Edit
                            </button>
                            <button
                            class="btn btn-danger btn-sm"
                            @click="deleteCustomer(customer.cusID)"
                            >
                            Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6">No Matching customers</td>
                    </tr>
                </tbody>
            </table>
  
            <div v-if="editing">
                <edit-customer
                    :customer="customers.find((customer) => customer.cusID === editCustomerId)"
                    @update="updateCustomer"
                    @cancel="cancelEdit"
                ></edit-customer>
            </div>
  
            <DeleteCustomer
            v-if="selectedCustomerForDeletion"
            :customer="selectedCustomerForDeletion"
            @delete="performDelete"
            @cancel="cancelDelete"
            />
  
            <form @submit.prevent="submitForm">
            <div v-if="isAddCustomerFormVisible" class="modal-overlay">
                <div class="custom-modal">
                    <h2 class="mb-4">Add New Customer</h2>

                    <div class="form-group">
                        <label for="cusID">ID:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="cusID"
                        v-model="customer.cusID"
                        />
                        <div v-if="cusIDError" class="alert alert-danger mt-2">
                        {{ cusIDError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cusName">Name:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="cusName"
                        v-model="newCustomer.cusName"
                        />
                        <div v-if="cusNameError" class="alert alert-danger mt-2">
                        {{ cusNameError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cusEmail">Email:</label>
                        <input
                        type="email"
                        class="form-control"
                        id="cusEmail"
                        v-model="newCustomer.cusEmail"
                        />
                        <div v-if="cusEmailError" class="alert alert-danger mt-2">
                        {{ cusEmailError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cusDOB">Date of Birth:</label>
                        <input
                        type="date"
                        class="form-control"
                        id="cusDOB"
                        v-model="newCustomer.cusDOB"
                        />
                        <div v-if="cusDOBError" class="alert alert-danger mt-2">
                        {{ cusDOBError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cusAddress">Address:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="cusAddress"
                        v-model="newCustomer.cusAddress"
                        />
                        <div v-if="cusAddressError" class="alert alert-danger mt-2">
                        {{ cusAddressError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="cusPhone">Phone nmuber:</label>
                        <input
                        type="tel"
                        class="form-control"
                        id="cusPhone"
                        v-model="newCustomer.cusPhone"
                        />
                        <div v-if="cusPasswordError" class="alert alert-danger mt-2">
                        {{ cusPasswordError }}
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="cusPassword">Password:</label>
                        <input
                        type="password"
                        class="form-control"
                        id="cusPassword"
                        v-model="newCustomer.cusPassword"
                        />
                        <div v-if="cusPasswordError" class="alert alert-danger mt-2">
                        {{ cusPasswordError }}
                        </div>
                    </div>

                    <button class="btn btn-success" @click="navigateToView">Add Customer</button>
                    <button class="btn btn-secondary" @click="cancelAddCustomer">
                        Cancel
                    </button>
                </div>    
            </div>
        </form>
        </div>
    </div>
</template>
  
  
<script>
import DeleteCustomer from "./DeleteCustomer.vue";
import EditCustomer from "./EditCustomer.vue";

export default {
    data() {
        return {
            customers: [],
            editing: false,
            editCustomerId: null,
            error: null,
            selectedCustomerForDeletion: null,
            isAddCustomerFormVisible: false,
            newCustomer: {
                cusID: "",
                cusName: "",
                cusEmail: "",
                cusDOB: "",
                cusAddress: "",
                cusPhone: "",
                cusPassword: "",
            },
                       
            cusIDError: null,
            cusNameError: null,
            cusEmailError: null,
            cusDOBError: null,
            cusAddressError: null,
            cusPasswordError: null,
            searchTerm: "",
        };
    },
    mounted() {
        this.fetchCustomers();
    },
    computed: {
        filteredCustomers() {
            return this.customers.filter((customer) => {
                const searchLower = this.searchTerm.toLowerCase();
                return (
                customer &&
                customer.cusName &&
                customer.cusName.toLowerCase().includes(searchLower)
                );
            });
        },
    },
    methods: {
        submitForm() {
            
            this.isSupplierNameValid = true;            
            this.isCompanyNameValid = true;          
            this.isContactNumberValid = true;          
            this.isEmailValid = true;   
            // If all validations pass, submit the form
            this.submitFormData();
        },
        async submitFormData() {
        try {
          const formData = {
                cusID: this.newCustomer.cusID,
                cusName: this.newCustomer.cusName,
                cusEmail: this.newCustomer.cusEmail,
                cusDOB: this.newCustomer.cusDOB,
                cusAddress: this.newCustomer.cusAddress,
                cusPhone: this.newCustomer.cusPhone,
                cusPassword: this.newCustomer.cusPassword,
          };
          //Connection
          const response = await fetch("http://localhost:5154/api/Customer/PostCustomers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error(`Failed to add customer. Status: ${response.status}`);
          }
  
          alert("Customer added successfully!");
          console.error("Customer added successfully!");
  
          // Reset form fields after successful submission
          
        } catch (error) {
          console.error("Error adding customer:", error);
  
          alert("Error adding customer. Please try again.");
        }
      },
      navigateToView() {
        
      },

      


      






      
        searchCustomers() {
        this.filteredCustomers = this.customers.filter((customer) => {
            const searchLower = this.searchTerm.toLowerCase();
            return customer.cusName.toLowerCase().includes(searchLower);
        });
        },
        async fetchCustomers() {
        try {
            const response = await fetch("http://localhost:5154/api/Customer/GetAllCustomers");
            if (!response.ok) {
            throw new Error(
                `Failed to fetch customers. Status: ${response.status}`
            );
            }

            const responseData = await response.json();
            console.log(response);
            this.customers = responseData.filter((customer) => !customer.deleted);
        } catch (error) {
            console.error("Error fetching customers:", error);
            this.error = "Error fetching customers. Please try again.";
        }
        },
        editCustomer(customer) {
        this.editing = true;
        this.editCustomerId = customer.cusID;
        },

        cancelEdit() {
        this.editing = false;
        this.editCustomerId = null;
        },
        

        // updateManager(updatedManager) {
        //     const updatedManagerData = {
        //         managerID: updatedManager.managerID,
        //         managerName: updatedManager.managerName,
        //         managerEmail: updatedManager.managerEmail,
        //         managerPhone: updatedManager.managerPhone,
        //         managerType: updatedManager.managerType,
        //     };

            
        //     fetch("http://localhost:5154/api/User/UpdateManagers", {
        //         method: "PUT",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify(updatedManagerData),
        //     })
        //     .then((response) => {
        //         if(!response.ok) {
        //             throw new Error(
        //                 `Failed to update product. Status: ${response.status}`
        //             );
        //         }
        //         console.log(updatedManager);
        //         //this.fetchCustomers();
        //         this.editing = false;
        //         this.editCustomerId = null;
        //         //this.showToastMessage("Manager updated successfully");
        //         console.log("Manager updated successfully");
        //     })
        //     .catch((error) => {
        //         console.error("Error updating manager: ", error);
        //         //this.showToastMessage("Error updating manager");
        //         console.log("Error updating manager");
        //     });
        // },

        async updateCustomer(updatedCustomer) {
            try {
            const response = await fetch(
                "http://localhost:5154/api/Customer/UpdateCustomers",
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCustomer),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to update customer. Status: ${response.status}`
                );
            }

            this.fetchCustomers();
            this.cancelEdit();
            } catch (error) {
            console.error("Error updating customer:", error);
            // Handle error, display error message, etc.
            }
        },

        deleteCustomer(cusID) {
        this.selectedCustomerForDeletion = this.customers.find(
            (customer) => customer.cusID === cusID
        );
        },
        async performDelete(cusID) {
        const updatedCustomers = this.customers.filter(
            (customer) => customer.cusID !== cusID
        );
        this.customers = updatedCustomers;

        try {
            await this.deleteCustomerOnServer(cusID);
        } catch (error) {
            console.error("Error deleting customer on the server:", error);
        }

        this.selectedCustomerForDeletion = null;
        },
        async deleteCustomerOnServer(cusID) {
        const url = `http://localhost:5154/api/Customer/DeleteCustomer?cusID=${cusID}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
            `Failed to delete customer on the server. Status: ${response.status}`
            );
        }
        },
        cancelDelete() {
            this.selectedCustomerForDeletion = null;
        },
        openAddCustomerForm() {
            this.isAddCustomerFormVisible = true;
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

        if (!this.validateEmail(this.newCustomer.cusEmail)) {
            this.cusEmailError = "Invalid email address.";
            isValid = false;
        }

        if (!this.validatePhone(this.newCustomer.cusPhone)) {
            this.cusPhoneError = "Invalid phone number.";
            isValid = false;
        }

        return isValid;
        },
        AddCustomer() {
            // Reset error messages
            this.cusIDError = null;
            this.cusNameError = null;
            this.cusEmailError = null;
            this.cusDOBError = null;
            this.cusAddressError = null;
            this.cusPasswordError = null;
            // Validate required fields
           
            if (!this.newCustomer.cusID) {
                this.cusIDError = "Customer ID is required.";
            }

            if (!this.newCustomer.cusName) {
                this.cusNameError = "Customer name is required.";
            }

            if (!this.newCustomer.cusEmail) {
                this.cusEmailError = "Customer email is required.";
            }

            if (!this.newCustomer.cusDOB) {
                this.cusDOBError = "Customer DOB is required.";
            }
            
            if (!this.newCustomer.cusAddress) {
                this.cusAddressErrormanagerTypeError = "Customer address is required.";
            }
        
            if (!this.newCustomer.cusPhone) {
                this.cusPhoneError = "Customer phone is required.";
            }

            if (!this.newCustomer.cusPassword) {
                this.cusPasswordError = "Customer password is required.";
            }

            if (!this.newCustomer.cusName || !this.newCustomer.cusEmail || !this.newCustomer.cusDOB || !this.newCustomer.cusAddress || !this.newCustomer.cusPhone || !this.newCustomer.cusPassword) {
                return; 
            }

            // Proceed with adding the course
            const newCustomerData = {
                cusID: this.newCustomer.cusID,
                cusName: this.newCustomer.cusName,
                cusEmail: this.newCustomer.cusEmail,
                cusDOB: this.newCustomer.cusDOB,
                cusAddress: this.newCustomer.cusAddress,
                cusPhone: this.newCustomer.cusPhone,
                cusPassword: this.newCustomer.cusPassword,
            };

            fetch("http://localhost:5154/api/Customer/PostCustomers", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newCustomerData),
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to add customer. Status: ${response.status}`);
            } else {
                this.fetchCustomers();
            }
            return response.json();
            })
            .then((newCustomer) => {
            this.customers.push(newCustomer);

            this.newCustomer = {
                cusID: "",
                cusName: "",
                cusEmail: "",
                cusDOB: "",
                cusAddress: "",
                cusPhone: "",
                cusPassword: "",
            };
            this.isAddCustomerFormVisible = false;
            })
            .catch((error) => {
            console.error("Error adding customer:", error);
            });
        },
        cancelAddCustomer() {
        this.newCustomer = {
            cusID: "",
                cusName: "",
                cusEmail: "",
                cusDOB: "",
                cusAddress: "",
                cusPhone: "",
                cusPassword: "",
        };
        this.isAddCustomerFormVisible = false;
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

        const companyName = 'URUWALA TEA FACTORY';
        const companyAddress = 'Uruwala Tea Factory, Akuressa, Matara';

        // Logo URL
        const logoUrl = './assests/logoUruwala.png'; // Replace this URL with the actual URL of your logo image

        // Create the header section
        let headerHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; float: left; margin-right: 20px;">
            <div style="float: left;">
            <h1>MANAGER REPORT</h1>
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
                <th style="width: 15%; text-align: center;">Manager ID</th>
                <th style="width: 15%; text-align: center;">Manager Name</th>
                <th style="width: 15%; text-align: center;">NIC</th>
                <th style="width: 15%; text-align: center;">Email</th>
                <th style="width: 15%; text-align: center;">Phone number</th>
                <th style="width: 15%; text-align: center;">Position</th>
            </tr>
        `;

        // Iterate through all products and add each product's details to the table
        this.customers.forEach(customer => {
            tableHtml += `
            <tr>
                <td style="text-align: center;">${customer.cusID}</td>
                <td style="text-align: center;">${customer.cusName}</td>
                <td style="text-align: center;">${customer.cusEmail}</td>
                <td style="text-align: center;">${customer.cusDOB}</td>
                <td style="text-align: center;">${customer.cusAddress}</td>
                <td style="text-align: center;">${customer.cusPhone}</td>
                <td style="text-align: center;">${customer.cusPassword}</td>
            </tr>
            `;
        });

        // Close the table tag
        tableHtml += '</table>';

        // Convert HTML table to PDF
        const opt = {
            margin: 1,
            filename: `CustomerReport_${currentDateTime.replace(/[^\w\s]/gi, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Use html2pdf library to convert HTML to PDF
        window.html2pdf().set(opt).from(tableHtml).save();
        },
    },
    components: {
        DeleteCustomer,
        EditCustomer,
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
</style>