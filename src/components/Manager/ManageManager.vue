<template>
    <div class="container mt-3">
        <div class="index-page">
            <h1 class="mb-4">Manager List</h1>
            <div class="mb-3">
                <input
                    type="text"
                    class="form-control"
                    id="search"
                    placeholder="SEARCH MANAGERS"
                    v-model="searchTerm"
                    @input="searchManagers"
                />
            </div>
            <button
            class="btn btn-primary mb-3"
            style="margin-left: 0"
            @click="openAddManagerForm"
            >
            Add Manager
            </button>

            
            
            <button class="btn btn-primary mb-3 ml-2" @click="generateReport">
            Generate Report
            </button>
  
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th>Manager ID</th>
                    <th>Manager Name</th>
                    <th>NIC</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    </tr>
                </thead>
                <tbody v-if="filteredManagers.length > 0">
                    <tr v-for="manager in filteredManagers" :key="manager.managerID">
                        <td>{{ manager.managerID }}</td>
                        <td>{{ manager.managerName }}</td>
                        <td>{{ manager.managerNIC }}</td>
                        <td>{{ manager.managerEmail }}</td>
                        <td>{{ manager.managerPhone }}</td>
                        <td>{{ manager.managerType }}</td>
                        
                        <td>
                            <button
                            class="btn btn-primary btn-sm"
                            @click="editManager(manager)"
                            >
                            Edit
                            </button>
                            <button
                            class="btn btn-danger btn-sm"
                            @click="deleteManager(manager.managerID)"
                            >
                            Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6">No Matching managers</td>
                    </tr>
                </tbody>
            </table>
  
            <div v-if="editing">
                <edit-manager
                    :manager="managers.find((manager) => manager.managerID === editManagerId)"
                    @update="updateManager"
                    @cancel="cancelEdit"
                ></edit-manager>
            </div>
  
            <DeleteManager
            v-if="selectedManagerForDeletion"
            :manager="selectedManagerForDeletion"
            @delete="performDelete"
            @cancel="cancelDelete"
            />
  
            <form @submit.prevent="submitForm">
            <div v-if="isAddManagerFormVisible" class="modal-overlay">
                <div class="custom-modal">
                    <h2 class="mb-4">Add New Manager</h2>

                    <div class="form-group">
                        <label for="managerID">ID:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="managerID"
                        v-model="newManager.managerID"
                        />
                        <div v-if="managerIDError" class="alert alert-danger mt-2">
                        {{ managerIDError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerName">Name:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="managerName"
                        v-model="newManager.managerName"
                        />
                        <div v-if="managerNameError" class="alert alert-danger mt-2">
                        {{ managerNameError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerNIC">NIC:</label>
                        <input
                        type="text"
                        class="form-control"
                        id="managerNIC"
                        v-model="newManager.managerNIC"
                        />
                        <div v-if="nICError" class="alert alert-danger mt-2">
                        {{ nICError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerEmail">Email:</label>
                        <input
                        type="email"
                        class="form-control"
                        id="managerEmail"
                        v-model="newManager.managerEmail"
                        />
                        <div v-if="managerEmailError" class="alert alert-danger mt-2">
                        {{ managerEmailError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerPhone">Phone number:</label>
                        <input
                        type="tel"
                        class="form-control"
                        id="managerPhone"
                        v-model="newManager.managerPhone"
                        />
                        <div v-if="managerPhoneError" class="alert alert-danger mt-2">
                        {{ managerPhoneError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerType">Position:</label>
                        <select id="dropdown" v-model="newManager.managerType">
                            <option disabled value="">Please select one</option>
                            <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>

                        <div v-if="managerTypeError" class="alert alert-danger mt-2">
                        {{ managerTypeError }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="managerPassword">Password:</label>
                        <input
                        type="password"
                        class="form-control"
                        id="managerPassword"
                        v-model="newManager.managerPassword"
                        />
                        <div v-if="managerPasswordError" class="alert alert-danger mt-2">
                        {{ managerPasswordError }}
                        </div>
                    </div>

                    <button class="btn btn-success" @click="navigateToView">Add Manager</button>
                    <button class="btn btn-secondary" @click="cancelAddManager">
                        Cancel
                    </button>
                </div>    
            </div>
        </form>
        </div>
    </div>
</template>
  
  
<script>
import DeleteManager from "./DeleteManager.vue";
import EditManager from "./EditManager.vue";

export default {
    data() {
        return {
            managers: [],
            editing: false,
            editManagerId: null,
            error: null,
            selectedManagerForDeletion: null,
            isAddManagerFormVisible: false,
            newManager: {
                managerID: "",
                managerName: "",
                managerNIC: "",
                managerEmail: "",
                managerPhone: "",
                managerType: "",
                managerPassword: "",
            },
            options: [
                {label: 'User Manager', value: 'userManager'},
                {label: 'Fertilizer Manager', value: 'fertilizerManager'},
                {label: 'Product Manager', value: 'productManager'},
                {label: 'Delivery Manager', value: 'deliveryManager'},
                {label: 'Supply Manager', value: 'supplyManager'},
                {label: 'Payment Manager', value: 'paymentManager'},
                {label: 'Customer Affair Manager', value: 'customerAffairManager'},
                {label: 'Employee Manager', value: 'employeeManager'},
            ],
           
            managerIDError: null,
            managerNameError: null,
            nICError: null,
            managerEmailError: null,
            managerPhoneError: null,
            managerTypeError: null,
            managerPasswordError: null,
            searchTerm: "",
        };
    },
    mounted() {
        this.fetchManagers();
    },
    computed: {
        filteredManagers() {
            return this.managers.filter((manager) => {
                const searchLower = this.searchTerm.toLowerCase();
                return (
                manager &&
                manager.managerName &&
                manager.managerName.toLowerCase().includes(searchLower)
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
                managerID: this.newManager.managerID,
                managerName: this.newManager.managerName,
                managerNIC: this.newManager.managerNIC,
                managerEmail: this.newManager.managerEmail,
                managerPhone: this.newManager.managerPhone,
                managerType: this.newManager.managerType,
                managerPassword: this.newManager.managerPassword,
          };
          //Connection
          const response = await fetch("http://localhost:5154/api/User/PostManagers", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
  
          if (!response.ok) {
            throw new Error(`Failed to add supplier. Status: ${response.status}`);
          }
  
          alert("Supplier added successfully!");
          console.error("Supplier added successfully!");
  
          // Reset form fields after successful submission
          
        } catch (error) {
          console.error("Error adding supplier:", error);
  
          alert("Error adding supplier. Please try again.");
        }
      },
      navigateToView() {
        
      },

      


      






      
        searchManagers() {
        this.filteredManagers = this.managers.filter((manager) => {
            const searchLower = this.searchTerm.toLowerCase();
            return manager.managerName.toLowerCase().includes(searchLower);
        });
        },
        async fetchManagers() {
        try {
            const response = await fetch("http://localhost:5154/api/User/GetAllManagers");
            if (!response.ok) {
            throw new Error(
                `Failed to fetch managers. Status: ${response.status}`
            );
            }

            const responseData = await response.json();
            console.log(response);
            this.managers = responseData.filter((manager) => !manager.deleted);
        } catch (error) {
            console.error("Error fetching managers:", error);
            this.error = "Error fetching managers. Please try again.";
        }
        },
        editManager(manager) {
        this.editing = true;
        this.editManagerId = manager.managerID;
        },

        cancelEdit() {
        this.editing = false;
        this.editManagerId = null;
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
        //         //this.fetchManagers();
        //         this.editing = false;
        //         this.editManagerId = null;
        //         //this.showToastMessage("Manager updated successfully");
        //         console.log("Manager updated successfully");
        //     })
        //     .catch((error) => {
        //         console.error("Error updating manager: ", error);
        //         //this.showToastMessage("Error updating manager");
        //         console.log("Error updating manager");
        //     });
        // },

        async updateManager(updatedManager) {
            try {
            const response = await fetch(
                "http://localhost:5154/api/User/UpdateManagers",
                {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedManager),
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to update manager. Status: ${response.status}`
                );
            }

            this.fetchManagers();
            this.cancelEdit();
            } catch (error) {
            console.error("Error updating manager:", error);
            // Handle error, display error message, etc.
            }
        },

        deleteManager(managerID) {
        this.selectedManagerForDeletion = this.managers.find(
            (manager) => manager.managerID === managerID
        );
        },
        async performDelete(managerID) {
        const updatedManagers = this.managers.filter(
            (manager) => manager.managerID !== managerID
        );
        this.managers = updatedManagers;

        try {
            await this.deleteManagerOnServer(managerID);
        } catch (error) {
            console.error("Error deleting manager on the server:", error);
        }

        this.selectedManagerForDeletion = null;
        },
        async deleteManagerOnServer(managerID) {
        const url = `http://localhost:5154/api/User/DeleteManager?managerID=${managerID}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(
            `Failed to delete manager on the server. Status: ${response.status}`
            );
        }
        },
        cancelDelete() {
            this.selectedManagerForDeletion = null;
        },
        openAddManagerForm() {
            this.isAddManagerFormVisible = true;
        },
        showCustomers() {
            window.location.href = '/UserDetails.vue';
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

        if (!this.validateEmail(this.newManager.managerEmail)) {
            this.managerEmailError = "Invalid email address.";
            isValid = false;
        }

        if (!this.validatePhone(this.newManager.managerPhone)) {
            this.managerPhoneError = "Invalid phone number.";
            isValid = false;
        }

        return isValid;
        },
        addManager() {
            // Reset error messages
            this.managerIDError = null;
            this.managerNameError = null;
            this.nICError = null;
            this.managerEmailError = null;
            this.managerPhoneError = null;
            this.managerTypeError = null;
            this.managerPasswordError = null;
            // Validate required fields
           
            if (!this.newManager.managerID) {
                this.managerIDError = "Manager ID is required.";
            }

            if (!this.newManager.managerName) {
                this.managerNameError = "Manager name is required.";
            }

            if (!this.newManager.managerNIC) {
                this.nICError = "Manager NIC is required.";
            }

            if (!this.newManager.managerEmail) {
                this.managerEmailError = "Manager email is required.";
            }
            
            if (!this.newManager.managerType) {
                this.cusAddressErrormanagerTypeError = "Manager type is required.";
            }
        
            if (!this.newManager.managerPassword) {
                this.managerPasswordError = "Manager password is required.";
            }

            if (!this.newManager.managerName || !this.newManager.managerNIC || !this.newManager.managerEmail || !this.newManager.managerType || !this.newManager.managerPassword) {
                return; 
            }

            // Proceed with adding the course
            const newManagerData = {
                managerID: this.newManager.managerID,
                managerName: this.newManager.managerName,
                managerNIC: this.newManager.managerNIC,
                managerEmail: this.newManager.managerEmail,
                managerType: this.newManager.managerType,
                managerPassword: this.newManager.managerPassword,
            };

            fetch("http://localhost:5154/api/User/PostManagers", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(newManagerData),
            })
            .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to add manager. Status: ${response.status}`);
            } else {
                this.fetchManagers();
            }
            return response.json();
            })
            .then((newManager) => {
            this.managers.push(newManager);

            this.newManager = {
                managerID: "",
                managerName: "",
                managerNIC: "",
                managerEmail: "",
                managerType: "",
                managerPassword: "",
            };
            this.isAddManagerFormVisible = false;
            })
            .catch((error) => {
            console.error("Error adding manager:", error);
            });
        },
        cancelAddManager() {
        this.newManager = {
            managerID: "",
            managerName: "",
            managerNIC: "",
            managerEmail: "",
            managerType: "",
            managerPassword: "",
        };
        this.isAddManagerFormVisible = false;
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
        this.managers.forEach(manager => {
            tableHtml += `
            <tr>
                <td style="text-align: center;">${manager.managerID}</td>
                <td style="text-align: center;">${manager.managerName}</td>
                <td style="text-align: center;">${manager.managerNIC}</td>
                <td style="text-align: center;">${manager.managerEmail}</td>
                <td style="text-align: center;">${manager.managerPhone}</td>
                <td style="text-align: center;">${manager.managerType}</td>
            </tr>
            `;
        });

        // Close the table tag
        tableHtml += '</table>';

        // Convert HTML table to PDF
        const opt = {
            margin: 1,
            filename: `ManagerReport_${currentDateTime.replace(/[^\w\s]/gi, '_')}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Use html2pdf library to convert HTML to PDF
        window.html2pdf().set(opt).from(tableHtml).save();
        },
    },
    components: {
        DeleteManager,
        EditManager,
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