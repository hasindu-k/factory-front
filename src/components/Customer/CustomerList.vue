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
            
                      
            <button class="btn btn-primary mb-3 ml-2" @click="generateReport">
            Generate Report
            </button>
  
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                    <th>Customer ID</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>DOB</th>
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
  
            
            <DeleteManager
            v-if="selectedCustomerForDeletion"
            :manager="selectedCustomerForDeletion"
            @delete="performDelete"
            @cancel="cancelDelete"
            />
  
            
    </div>
</div>
</template>

<script>
import DeleteCustomer from "./DeleteCustomer.vue";

export default {
    data() {
        return {
            customers: [],
            error: null,
            selectedCustomerForDeletion: null,
                                 
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
            this.selectedManagerForDeletion = null;
        },
        

        
        addManager() {
            // Reset error messages
            
            this.managerNameError = null;
            this.nICError = null;
            this.managerEmailError = null;
            this.managerPhoneError = null;
            this.managerTypeError = null;
            this.managerPasswordError = null;
            // Validate required fields
           

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

            fetch("http://localhost:5154/api/Users/PostManagers", {
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
                this.fetchCustomers();
            }
            return response.json();
            })
            .then((newManager) => {
            this.courses.push(newManager);

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
            filename: `StockReport_${currentDateTime.replace(/[^\w\s]/gi, '_')}.pdf`,
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
        
    },
};
</script>