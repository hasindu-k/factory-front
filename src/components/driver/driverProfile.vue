<template>
    <div class="back-container">
      <div class="profile">
        <div class="profile-picture">
  <span class="upload-text"><br>Upload <br>Profile Picture</span>
  <input type="file" accept="image/*" @change="handleFileUpload">
</div>

        <h2>Welcome, {{ driverName }}</h2>
        <h3>Driver Profile</h3>
        <div class="profile-details">
          <div class="data-container">
            <p><strong>Driver ID:</strong> {{ driverId }}</p>
          </div>
          <div class="data-container">
            <p><strong>Driver Name:</strong> {{ driverName }}</p>
          </div>
          <div class="data-container">
            <p><strong>Contact Number:</strong> {{ driverContact }}</p>
          </div>
          <div class="data-container">
            <p><strong>Email:</strong> {{ driverEmail }}</p>
          </div>
          <div class="data-container">
            <p><strong>Address:</strong> {{ driverAddress }}</p>
          </div>
          <div class="data-container">
            <p><strong>License Number:</strong> {{ diverLic }}</p>
          </div>
        </div>
      </div>
    </div>
    <body>
     <router-link to="/" class="back-button">Dashboard</router-link>
    </body>
  </template>
  
  <script>
  
  export default {
    data() {
      return {
        driverId: "",
        driverName: "",
        driverContact: "",
        driverEmail: "",
        driverAddress: "",
        diverLic: "",
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
      this.driverId = this.$route.params.id;
      this.driverName = this.$route.query.driverName;
      this.driverContact = this.$route.query.driverContact;
      this.driverEmail = this.$route.query.driverEmail;
      this.driverAddress = this.$route.query.driverAddress;
      this.diverLic = this.$route.query.diverLic;
    },
  };
  </script>
  
  <style scoped>
  .back-container {
    /* background-image: url('\teaaa.jpg'); Add your background image URL */
    background-image: url('D:\Downloads\teaaa.jpg'); /* Add your background image URL */
    background-size: cover; /* Cover the entire container */
    background-position: center; /* Center the background image */
    width: 100%;
    height: 100vh; /* Adjust height as needed */
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .profile {
    max-width: 80%; /* Adjust width as needed */
    margin: auto;
    background-color: #f9f9f9; /* Light gray background */
    padding: 20px;
    border-radius: 10px; /* Rounded corners */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Drop shadow */
  }
  
  .profile h2, .profile h3 {
    text-align: center;
    margin-bottom: 20px;
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
  
  .profile-details p {
    margin: 0; /* Reset default paragraph margin */
    text-align: left; /* Left align paragraphs */
  }
  
  .profile-details strong {
    font-weight: bold;
  }

  .back-button {
  /* position: fixed
  right: 70px; */
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
  