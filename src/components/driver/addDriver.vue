<template>
  <PageHeader />
  <br>
  <br>
  <br>
  <div class="add-driver-form">
    <h2>Driver Registration Form <i class="fas fa-user-plus"></i></h2>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="driverId">Driver ID :</label>
        <input type="text" id="driverId" v-model="driverId" />
        <!-- <select class="form-group" id="input-id" v-model="driverId" required>
          <option disabled value="">Choose...</option>
          <option value="D001">D001</option>
          <option value="D002">D002</option>
          <option value="D067">D067</option>
          <option value="D100">D100</option>
        </select> -->
      </div>

      <div class="form-group">
        <label for="driverName"><i class="fa-solid fa-user"></i>Driver Name <i class="fas fa-user"></i>:</label>
        <input type="text" id="driverName" v-model="driverName" required />
        <span v-if="!isDriverNameValid" class="error-message"
          >Please enter a valid driver name (only alphabets and spaces)</span
        >
      </div>

      <div class="form-group">
        <label for="driverContact"
          >Contact Number <i class="fas fa-phone"></i>:</label
        >
        <input
          type="text"
          id="driverContact"
          v-model="driverContact"
          required
        />
        <span v-if="!isDriverContactValid" class="error-message"
          >Please enter a valid 10-digit phone number</span
        >
      </div>

      <div class="form-group">
        <label for="driverEmail">Email <i class="fas fa-envelope"></i>:</label>
        <input
          type="text"
          id="driverEmail"
          v-model="driverEmail"
          required
        />
        <span v-if="!isDriverEmailValid" class="error-message"
          >Please enter a valid email address</span
        >
      </div>

      <div class="form-group">
        <label for="driverAddress"
          >Address <i class="fas fa-map-marker-alt"></i>:</label
        >
        <textarea
          id="driverAddress"
          v-model="driverAddress"
          required
        ></textarea>
      </div>

      <!-- adding driverLIC -->
      <div class="form-group">
        <label for="diverLic"
          >License Number <i class="fas fa-user"></i>:</label
        >
        <input type="text" id="diverLic" v-model="diverLic" />
      </div>

      <!-- <div class="form-group">
        <label for="profilePicture">Profile Picture:</label>
        <input type="file" id="profilePicture" @change="handleFileUpload">
        <img v-if="profilePicturePreview" :src="profilePicturePreview" alt="Profile Picture Preview" style="max-width: 200px; margin-top: 10px;">
      </div> -->

      <button @click="submitForm">Submit <i class="fas fa-check"></i></button>
      <br /><br />

      <button @click="navigateToView">
        View Details <i class="fas fa-eye"></i>
      </button>
      
    </form>
  </div>
  <button class="btn_button" @click="navigateToDashboard">
      Go to Dashboard <i class="fas fa-arrow-right"></i>
    </button>
</template>

<script>
import PageHeader from '../PageHeaderManager.vue';

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      driverId: "",
      driverName: "",
      driverContact: "",
      driverEmail: "",
      driverAddress: "",
      diverLic: "",

      isDriverNameValid: true,
      isDriverContactValid: true,
      isDriverEmailValid: true,
    };
  },
  methods: {
    
    async submitForm() {
      // Validate driver name
      if (!this.driverName.match(/^[A-Za-z ]+$/)) {
        this.isDriverNameValid = false;
        return;
      } else {
        this.isDriverNameValid = true;
      }

      // Validate contact number
      if (!this.driverContact.match(/^[0-9]{10}$/)) {
        this.isDriverContactValid = false;
        return;
      } else {
        this.isDriverContactValid = true;
      }

      // Validate email
      if (!this.validateEmail(this.driverEmail)) {
        this.isDriverEmailValid = false;
        return;
      } else {
        this.isDriverEmailValid = true;
      }

      // If all validations pass, submit the form
      await this.submitFormData();
    },

    validateEmail(driverEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(driverEmail);
    },

    async submitFormData() {
      try {
        const formData = {
          driverId: this.driverId,
          driverName: this.driverName,
          driverAddress: this.driverAddress,
          driverContact: this.driverContact,
          driverEmail: this.driverEmail,
          diverLic: this.diverLic,
        };

        // Connection
        const response = await fetch(
          "http://localhost:5154/api/Driver/Postdrivers",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to add driver. Status: ${response.status}`);
        }

        console.log(response);
        // Display success alert

        // Reset form fields after successful submission
        this.resetFormFields();
        alert("Driver added successfully!");

        // await this.retrieveDrivers();

        // Redirect to the driver list page
        // this.navigateToView();

      } catch (error) {
        console.error("Error adding driver:", error);
        // Display error alert
        alert("Error adding driver. Please try again.");
      }

      // Redirect to the driver list page
      this.navigateToView();
    },

    async retrieveDrivers() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Driver/GetAlldrivers"
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch driver list. Status: ${response.status}`
          );
        }
        const driverList = await response.json();
        this.$store.commit("updateDriverList", driverList);
      } catch (error) {
        console.error("Error fetching driver list:", error);
        throw error;
      }
    },

    resetFormFields() {
      // Reset all form fields to empty strings
      this.driverId = "";
      this.driverName = "";
      this.driverAddress = "";
      this.driverContact = "";
      this.driverEmail = "";
      this.diverLic = "";
    },

    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: "driverList" });
      } else {
        console.error("Router instance is undefined.");
      }
    },

    navigateToDashboard() {
        // addDriver page 
        this.$router.push('/delivery-dashboard');
    
  },
},

};
</script>

<style scoped>
.add-driver-form {
  max-width: 400px;
  margin: auto;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #4caf50;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="text"],

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.btn_button {
  position: absolute;
  top: 90px; 
  left: 10px;
  padding: 5px 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}
</style>
