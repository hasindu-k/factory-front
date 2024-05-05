<template>
  <div class="page-container">
    <PageHeader/>

    <div class="spacer"></div> <!-- Add space between header and form -->

    <div class="flex-container">
      <div class="form-container">
        <div class="supplier-update">
          <h2>Update Supplier</h2>
          <form @submit.prevent="submitForm">
            
            <label for="supplierName">Supplier Name:</label>
            <input type="text" id="supplierName" v-model="supplierName" required>

            <label for="companyName">Company Name:</label>
            <input type="text" id="companyName" v-model="companyName" required>

            <!-- <label for="joinDate">Join Date:</label>
            <input type="date" id="joinDate" v-model="joinDate" required> -->

            <label for="contactNumber">Contact Number:</label>
            <input type="text" id="contactNumber" v-model="contactNumber" required>

            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>

            <label for="address">Address:</label>
            <textarea id="address" v-model="address" required></textarea>

            <button type="submit">Update Supplier</button><br><br>

            <!-- Navigation button to view details -->
            <button @click="navigateToView">View Details</button>
          </form>
        </div>
      </div>
      <div class="image-container"></div>
    </div>
  <!-- Footer Section -->
  <PageFooter/>
  </div>
</template>

<script>
import PageHeader from './PageHeader.vue';
import PageFooter from './PageFooter.vue';
export default {
  components: {
    PageHeader,
    PageFooter
  },
  data() {
    return {
      supplierName: '',  
      companyName: '',
      // joinDate: '',
      contactNumber: '',
      email: '',
      address: ''
    };
  },
  mounted() {
    this.supplierID = this.$route.params.id;
    this.supplierName = this.$route.query.supplierName;
    this.companyName = this.$route.query.companyName;
    // this.joinDate = this.$route.query.joinDate;
    this.contactNumber = this.$route.query.contactNumber;
    this.email = this.$route.query.email;
    this.address = this.$route.query.address;
    this.retrieveSupplier();
  },
  methods: {
    async retrieveSupplier() {
      try {
        const supplierID = this.$route.params.id;
        const response = await fetch(`http://localhost:5154/api/Supplier/${supplierID}`);
        if (!response.ok) {
          throw new Error("Failed to retrieve supplier details");
        }
        const data = await response.json();
        this.supplierName = data.supplierName;
        this.companyName = data.companyName;
        // this.joinDate = data.joinDate;
        this.contactNumber = data.contactNumber;
        this.email = data.email;
        this.address = data.address;
      } catch (error) {
        console.error("Error retrieving supplier details:", error);
      }
    },
    async submitForm() {
      try {
        const formData = {
          supplierName: this.supplierName,
          companyName: this.companyName,
          // joinDate: this.joinDate,
          contactNumber: this.contactNumber,
          email: this.email,
          address: this.address
        };
        const response = await fetch(`http://localhost:5154/api/Supplier/${this.$route.params.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          throw new Error("Failed to update supplier");
        }
        alert("Supplier updated successfully!");
        this.$router.push({ name: 'SupplierTable' });
      } catch (error) {
        console.error("Error updating supplier:", error);
        alert("Error updating supplier. Please try again.");
      }
    },
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: 'SupplierTable' });
      } else {
        console.error("Router instance is undefined.");
      }
    }
  }
};
</script>

<style scoped>
.supplier-update {
  max-width: 400px;
  margin: auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.spacer {
  height: 20px; /* Adjust as needed */
}

.flex-container {
  display: flex;
}

.form-container {
  flex: 0.65; /* Take up half of the remaining space */
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px; /* Add border radius for rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Add box shadow for depth */
}


.image-container {
  flex: 1;
  background-image: url('/src/assets/22.png'); /* Specify the path to your background image */
  background-size: cover;
  background-position: center;
  border-radius: 10px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #4CAF50;  
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;  
}

input[type="text"],
input[type="email"],
textarea,
input[type="date"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc; 
  border-radius: 5px;
  box-sizing: border-box;  
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;  
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049; 
}

button[type="submit"] {
  background-color: #007bff;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
