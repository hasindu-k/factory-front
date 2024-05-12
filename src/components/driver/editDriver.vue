<template>
  <div class="driver-update">
    <h2>Update Driver</h2>
    <form @submit.prevent="submitForm">
      
      <label for="driverId">Driver ID:</label>
      <input type="text" id="driverId" v-model="driverId" required>

      <label for="driverName">Driver Name:</label>
      <input type="text" id="driverName" v-model="driverName" required>

  
      <label for="driverContact">Contact Number:</label>
      <input type="text" id="driverContact" v-model="driverContact" required>

      <label for="driverEmail">Email:</label>
      <input type="text" id="driverEmail" v-model="driverEmail" required>

      <label for="driverAddress">Address:</label>
      <textarea id="driverAddress" v-model="driverAddress" required></textarea>

      <label for="diverLic">Driver License No:</label>
      <input type="text" id="diverLic" v-model="diverLic" required>
              
      <button type="submit">Update Driver</button><br><br>
      

      <!-- Navigation button to view details -->
      <button @click="navigateToView">View Details</button>
    </form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      driverId: '',
      driverName: '', //driverId
      driverContact: '',
      driverEmail: '',
      driverAddress: '',
      diverLic: ''

    };
  },

  mounted() {
  
    this.driverId = this.$route.params.id;
    this.driverName = this.$route.query.driverName;
    this.driverContact = this.$route.query.driverContact;
    this.driverEmail = this.$route.query.driverEmail;
    this.driverAddress = this.$route.query.driverAddress;
    this.diverLic = this.$route.query.diverLic;
     
    this.retrieveDriver();
  },
  methods: {
    async retrieveDriver() {
      try {
        
        const driverId = this.$route.params.id; //try query
        console.log("Driver Id:", driverId);

       
        const response = await fetch(`http://localhost:5154/api/Driver/Updatedrivers/${driverId}`);   //{this.$route.params.id}
        if (!response.ok) {
          throw new Error("Failed to retrieve driver details");
        }

         
        const data = await response.json();
        this.driverId = data.driverId;
        this.driverName = data.driverName;  //driverId
        this.driverAddress = data.driverAddress;
        this.driverContact = data.driverContact;
        this.driverEmail = data.driverEmail;
        this.diverLic = data.diverLic;

        console.log("Form field values :", this.driverName, this.driverAddress, this.driverContact, this.driverEmail, this.diverLic )
      } catch (error) {
        console.error("Error retrieving driver details:", error);
      }
    
    },
  
    async submitForm() {
  try {
    const formData = {
      driverId: this.driverId,
      driverName: this.driverName,
      driverAddress: this.driverAddress,
      driverContact: this.driverContact,
      driverEmail: this.driverEmail,
      diverLic : this.diverLic
    };

    console.log(formData)

    const response = await fetch("http://localhost:5154/api/Driver/Updatedrivers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update driver");
    }

    alert("Driver updated successfully!");

    // Refresh the driver list after successful update
    this.$router.push({ name: 'driverList' });
  } catch (error) {
    console.error("Error updating driver:", error);

    alert("Error updating driver. Please try again. " );
  }
},

    
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: 'driverList' });
      } else {
        console.error("Router instance is undefined.");
      }
    }
  }
};

</script>





<style scoped>
.driver-update {
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
  color: #4CAF50;  
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;  
}

input[type="text"],

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