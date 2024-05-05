<template>
  <div class="page-container">
    <PageHeader/>

    <div class="spacer"></div> <!-- Add space between header and form -->
    <div class="background"></div> <!-- Background image -->
    <div class="form-container"></div>
    <br>
    <div class="back-button-container">
  <router-link to="/" class="back-button small">Back to Dashboard</router-link>
</div>

    <div class="supplier-table">
      <h2>Supplier Details</h2>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by name or phone number">
      </div>
      <div class="report-button-container">
        <button @click="generateReport" class="btn btn-primary">Generate PDF Report</button>
      </div>
      <table class="table table-striped tea-table" v-if="List">
        <thead>
          <tr>
            <th>Supplier ID</th>
            <th>Supplier Name</th>
            <th>Company Name</th>
            <th>Join Date</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(supplier, index) in filteredSuppliers" :key="index">
            <td>{{ supplier.supplierID }}</td>
            <td>{{ supplier.supplierName }}</td>
            <td>{{ supplier.companyName }}</td>
            <td>{{ supplier.joinDate }}</td>
            <td>{{ supplier.contactNumber }}</td>
            <td>{{ supplier.email }}</td>
            <td>{{ supplier.address }}</td>
            <td>
              <button @click="deleteSupplier(supplier.supplierID)" class="btn btn-danger">Delete</button><br><br>
              <router-link :to="{ name: 'SupplierUpdate', params: { id: supplier.supplierID }, query: supplier }">
                <button @click="updateSupplier(supplier)" class="btn btn-warning">Update</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
      <br>
      <br>
      <router-link to="/supplier-form" class="back-button">Back to Form</router-link><br><br>
      
    </div>

    <!-- HTML container for PDF content -->
    <div id="pdf-container" style="display: none;"></div>

    <!-- Footer Section -->
    <PageFooter/>
    
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';
import html2pdf from 'html2pdf.js'; // Import html2pdf library
export default {
  components: {
    PageHeader,
    PageFooter
  },

  data() {
    return {
      List: true,
      suppliers: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredSuppliers() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.suppliers.filter(supplier =>
        supplier.supplierName.toLowerCase().includes(query) ||
        supplier.contactNumber.includes(query)
      );
    }
  },
  mounted() {
    this.retrieveSuppliers();
  },
  methods: {
    async retrieveSuppliers() {
      try {
        const response = await fetch("http://localhost:5154/api/Supplier");
        if (!response.ok) {
          throw new Error("Failed to fetch suppliers");
        }
        const data = await response.json();
        this.suppliers = data;
      } catch (error) {
        console.error("Error retrieving suppliers:", error);
      }
    },
    async deleteSupplier(supplierID) {
      const confirmDelete = window.confirm("Are you sure you want to delete this supplier?");
      if (!confirmDelete) {
        return;  
      }
      
      try {
        const response = await fetch(`http://localhost:5154/api/Supplier/${supplierID}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete supplier");
        }
        
        this.suppliers = this.suppliers.filter(supplier => supplier.supplierID !== supplierID);
        alert("Supplier deleted successfully!");
      } catch (error) {
        console.error("Error deleting supplier:", error);
        alert("Error deleting supplier. Please try again.");
      }
    },
    updateSupplier(supplier) {
      this.List = false; 
      console.log("Update button clicked for supplier:", supplier);
      const router = this.$router;
      if (router) {
        router.push({ name: 'SupplierUpdate', params: { id: supplier.supplierID }, query: supplier });
      } else {
        console.error("Router instance is undefined.");
      }
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
      const logoUrl = "../assets/logoUruwala.png"; // Replace this URL with the actual URL of your logo image

      // Create the header section
      let headerHtml = `
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="${logoUrl}" alt="Company Logo" style="width: 100px; height: auto; float: left; margin-right: 20px;">
          <div style="float: left;">
            <h1>SUPPLIER DETAILS REPORT</h1>
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
        <div style="width: 100%;">
          <table border="1">
            <tr>
              <th style="width: 10%; text-align: center;">Supplier ID</th>
              <th style="width: 15%; text-align: center;">Supplier Name</th>
              <th style="width: 15%; text-align: center;">Company Name</th>
              <th style="width: 10%; text-align: center;">Join Date</th>
              <th style="width: 15%; text-align: center;">Contact Number</th>
              <th style="width: 15%; text-align: center;">Email</th>
              <th style="width: 20%; text-align: center;">Address</th>
            </tr>
      `;

      // Iterate through all suppliers and add each supplier's details to the table
      this.suppliers.forEach((supplier) => {
        tableHtml += `
          <tr>
            <td style="text-align: center;">${supplier.supplierID}</td>
            <td style="text-align: center;">${supplier.supplierName}</td>
            <td style="text-align: center;">${supplier.companyName}</td>
            <td style="text-align: center;">${supplier.joinDate}</td>
            <td style="text-align: center;">${supplier.contactNumber}</td>
            <td style="text-align: center;">${supplier.email}</td>
            <td style="text-align: center;">${supplier.address}</td>
          </tr>
        `;
      });

      // Close the table tag
      tableHtml += "</table>";

      // Convert HTML table to PDF
      const opt = {
        margin: 1,
        filename: `SupplierDetailsReport_${currentDateTime.replace(
          /[^\w\s]/gi,
          "_"
        )}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };

      // Use html2pdf library to convert HTML to PDF
      html2pdf().set(opt).from(tableHtml).save();
    },
  },
};
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-container input[type=text] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.search-container input[type=text]:focus {
  outline: none;
}

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 12px;
}

.supplier-table {
  /* max-width: 800px; */
  margin: auto;
}

.tea-table {
  border-collapse: collapse;
  width: 100%;
}

.tea-table th,
.tea-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tea-table th {
  background-color: #128441;
  color: white;
}

.tea-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tea-table tbody tr:hover {
  background-color: #e0f2f1;
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #388e3c;
}

.btn-danger {
  background-color: #f44336;
  border-color: #fb0008;
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-warning {
  background-color: #0f73f5;
  border-color: #ff9800;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
}
.report-button-container {
  display: flex;
  justify-content: flex-end; /* Align button to the right */
  margin-bottom: 10px; /* Adjust margin as needed */
}
.back-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.back-button.small {
  padding: 5px 10px;
  font-size: 14px;
}


</style>
