<template>
    <div class="supplier-profile">
      <div class="profile-picture">
        <span class="upload-text"><br>Upload <br>Profile Picture</span>
        <input type="file" accept="image/*" @change="handleFileUpload">
      </div>
  
      <h2>Welcome, {{ supplierName }}</h2>
      <h3>Supplier Profile</h3>
      <div class="profile-details">
        <div class="data-container">
          <label for="supplierName">Supplier Name:</label>
          <input type="text" id="supplierName" v-model="supplierName">
        </div>
        <div class="data-container">
          <label for="contactNumber">Contact Number:</label>
          <input type="text" id="contactNumber" v-model="supplierContact">
        </div>
        <div class="data-container">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="supplierEmail">
        </div>
        <div class="data-container">
          <label for="address">Address:</label>
          <textarea id="address" v-model="supplierAddress"></textarea>
        </div>
        <!-- <div class="data-container">
          <label for="licenseNumber">License Number:</label>
          <input type="text" id="licenseNumber" v-model="supplierLicense">
        </div> -->
      </div>
      <router-link to="/" class="back-button">Dashboard</router-link>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        supplierName: "",
        supplierContact: "",
        supplierEmail: "",
        supplierAddress: "",
        supplierLicense: "",
        imageUrl: null // To store the URL of the uploaded image
      };
    },
    methods: {
      handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
          this.imageUrl = URL.createObjectURL(file);
        }
      },
    },
    created() {
      // Fetch profile data from route params and query params
      this.supplierName = this.$route.query.supplierName;
      this.supplierContact = this.$route.query.supplierContact;
      this.supplierEmail = this.$route.query.supplierEmail;
      this.supplierAddress = this.$route.query.supplierAddress;
      
    },
  };
  </script>
  
  <style scoped>
  .supplier-profile {
    max-width: 80%; /* Adjust width as needed */
    margin: auto;
    background-color: #f9f9f9; /* Light gray background */
    padding: 20px;
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Drop shadow */
  }
  
  .profile-picture {
    width: 100px; /* Adjust the size of the circular space */
    height: 100px;
    border-radius: 50%; /* To create a circular shape */
    border: 2px solid #ccc; /* Add border for visual clarity */
    margin: 0 auto 20px; /* Center the circular space and add space below */
    overflow: hidden; /* Ensure the image stays within the circular space */
    position: relative; /* Position relative for input file positioning */
  }
  
  .upload-text {
    color: #333; /* Text color */
    font-size: 10px; /* Text font size */
  }
  
  .profile-picture input[type="file"] {
    position: absolute; /* Position absolutely within the circular space */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0; /* Hide the input visually */
    cursor: pointer; /* Change cursor to pointer when hovering */
  }
  
  .profile-details {
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #fff; /* White background */
  }
  
  .data-container {
    margin-bottom: 15px; /* Additional space between lines */
  }
  
  .data-container label {
    font-weight: bold;
  }
  
  .data-container input,
  .data-container textarea {
    width: 100%;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-sizing: border-box;
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
  </style>
  