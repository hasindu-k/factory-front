<template>
  <div class="background">
    <div class="add-delivery-form">
      <h2>Delivery Registration Form <i class="fas fa-user-plus"></i></h2>
      <form @submit.prevent="submitForm">

        <div class="form-group">
          <label for="deliveryDate">Date <i class="fas fa-user"></i>:</label>
          <input type="text" id="deliveryDate" v-model="deliveryDate" required placeholder="YYYY-MM-DD"  />
        </div>

        <div class="form-group">
          <label for="driverId">Driver ID <i class="fas fa-user"></i>:</label>
          <input type="text" id="driverId" v-model="driverId" required placeholder="Please fill 'NON'"  />
        </div>

        <div class="form-group">
          <label for="CusName">Customer Name <i class="fas fa-user"></i>:</label>
          <input type="text" id="CusName" v-model="CusName" required  />
        </div>

    <div class="form-group">
          <label for="CusContact">Contact Number <i class="fas fa-user"></i>:</label>
          <input type="text" id="CusContact" v-model="CusContact" />
        </div>

        <div class="form-group">
          <label for="Cusaddress">Delivery Address <i class="fas fa-user"></i>:</label>
          <input type="text" id="Cusaddress" v-model="Cusaddress" />
        </div> 

        <div class="form-group">
          <label for="delStatus">Status <i class="fas fa-user"></i>:</label> 
          <!-- <input type="text" id="Cusaddress" v-model="Cusaddress" /> -->
          <select class="form-group" id="input-id" v-model="delStatus" required>
            <option disabled value="">Choose...</option>
            <option disabled value="">Choose...</option>
            <option value="Done Payment">Done Payment</option>
          </select>
        </div> 
      

        <button @click="submitFormData">Add <i class="fas fa-check"></i></button>
      <br /><br />

      <button @click="navigateToView">
        View all Deliveries <i class="fas fa-eye"></i>
      </button>

      </form>
    </div>
</div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        deliveryDate: "",
        driverId: "",
        CusName: "",
        CusContact: "",
        Cusaddress: "",
        delStatus: "",
        
        
      };
      
    },
    methods: {

      async submitForm(){

      },

      async submitFormData() {
        try {
          const formData = {
            deliveryDate: this.deliveryDate,
            driverId: this.driverId,
            CusName: this.CusName,
            CusContact: this.CusContact,
            Cusaddress: this.Cusaddress,
            delStatus: this.delStatus,
            
          };
          console.log(formData)
  
          // Connection
          const response = await fetch(
            "http://localhost:5154/api/Delivery/Postdeliveries",
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
          alert("Delivery added successfully!");
  
          // Reset form fields after successful submission
          this.resetFormFields();
         
  
          // await this.retrieveDrivers();
  
          // Redirect to the driver list page
          this.navigateToView();
          
        } catch (error) {
          console.error("Error adding delievry:", error);
          // Display error alert
          alert("Error adding delievry. Please try again.");
        }
  
        // Redirect to the driver list page
        this.navigateToView();
      },
  
      async retrieveDeliveries() {                    //change here
        try {
          const response = await fetch(
            "http://localhost:5154/api/Delivery/GetAlldeliveries"
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch delivery list. Status: ${response.status}`
            );
          }
          const deliveryList = await response.json();
          this.$store.commit("updateDeliveryList", deliveryList);
        } catch (error) {
          console.error("Error fetching delivery list:", error);
          throw error;
        }
      },
  
      resetFormFields() {
        // Reset all form fields to empty strings
        this.deliveryDate = "";
        this.driverId = "";
        this.CusName = "";
        this.CusContact = "";
        this.Cusaddress = "";
        this.delStatus = "";
        
      },
  
      navigateToView() {
        const router = this.$router;
        if (router) {
          router.push({ name: "deliveryList" });
        } else {
          console.error("Router instance is undefined.");
        }
      },
    },
  };
  </script>
  
  <style scoped>

.background {
  /* background-color: #6ec556; */
  background-image: url('D:\Downloads\bgm-scaled.jpg');
  background-color: rgba(110, 197, 86, 0.3);
  background-size: 100%; /* Cover the entire container */
  background-position: center; /* Center the background image */
  width: 100%;
  height: 100vh; /* Adjust height as needed */
  display: flex;
  /* justify-content: center;
  align-items: center; */
}

  .add-delivery-form {
    max-width: 400px;
    margin: auto;
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #4caf50;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
   select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    appearance: none; 
    -webkit-appearance: none; 
    -moz-appearance: none; 
    background-image: url('data:image/svg+xml;utf8,<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); 
    background-repeat: no-repeat;
    background-position: right 10px top 50%;
    background-size: 24px auto;
    font-size: 16px;
    line-height: 1.5;
    cursor: pointer;
    outline: none;
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
  