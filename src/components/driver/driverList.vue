<template>
  <PageHeader />
  <div class="driver-list">
    <h2>Driver List</h2>

    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by driver ID"
      />
    </div>

    <table class="table table-striped tablee" >
      <thead>
        <tr>
          <th>Driver ID</th>
          <th>Driver Name</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th>Address</th>
          <th>License No</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(driver, index) in filteredDrivers" :key="index">
           <td
             @click="showDriverProfile(driver.driverId)">
             <router-link :to="{ name: 'driverProfile', query: driver }">{{ driver.driverId }}</router-link>
          </td>
          <td>{{ driver.driverName }}</td>
          <td>{{ driver.driverContact }}</td>
          <td>{{ driver.driverEmail }}</td>
          <td>{{ driver.driverAddress }}</td>
          <td>{{ driver.diverLic }}</td>
          <td>
           
              <button @click="deleteDriver(driver)" class="btn btn-danger"> Delete </button>
              <br><br>
              
              <router-link :to="{ name: 'editDriver', params: { id: driver.driverId }, query : driver }">
              <button class="btn btn-warning">Update</button>
              </router-link>

              <!-- <router-link :to="{ name: 'editDriver', params: { id: driver.driverId }, query: driver }">
                <button class="btn btn-warning">Update</button>
              </router-link> -->
              

              <!-- <button @click="updateDriver(driver)" class="btn btn-warning"> Update </button> -->
            
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />

    <router-link to="/add-driver-form" class="back-button">Back to Form</router-link>

    <!-- Floating driver profile -->
    <router-view v-if="showProfile"></router-view>

  </div>
</template>

<script>
import PageHeader from '../PageHeaderManager.vue';


export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      drivers: [],
      searchQuery: '',
      showProfile: false
    };
  },
  computed: {
    filteredDrivers() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.drivers.filter((driver) => driver.driverId.toLowerCase().includes(query)); //check serach D
    },
  },
  mounted() {
   
      this.retrieveDrivers();
   
  },
  methods: {
    async retrieveDrivers() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Driver/GetAlldrivers"
        );
        if (!response.ok) {
          throw new Error("Error fetching driver details");
        }
        const data = await response.json();
        this.drivers = data;
      } catch (error) {
        console.error("Error fetching driver details:", error);
      }
    },

    
    async deleteDriver(driver) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this driver?"
      );
      if (!confirmDelete) {
        return;
      }
      try {
        const response = await fetch(
          'http://localhost:5154/api/Driver/Deletedriver?driverId=${driver.driverId}',
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.drivers = this.drivers.filter(d => d.driverId !== driver.driverId);
        alert("Driver deleted successfully!");
      } catch (error) {
        console.error("Error deleting driver:", error);
        alert(`Error deleting driver: ${error.message}`);
      }
      this.retrieveDrivers(); // Refresh list
    },


    updateDriver(driver) {
      console.log("Update button clicked for driver:", driver);
      const router = this.$router;
      if (router) {
        router.push({ 
          name: 'editDriver', 
          params: { id: driver.driverId },
          query: driver
        });
          
          // query: driver}); // Pass driver details as query params
      
      } else {
        console.error("Router instance is undefined.");
      }
    },

    
    showDriverProfile(driverId) {
      const router = this.$router;
      if (router) {
        router.push({ name: "driverProfile", params: { id: driverId } });
        this.showProfile = true; // Show the floating profile
      } else {
        console.error("Router instance is undefined.");
      }
    },
  },
};
</script>


<style scoped>
.search-container {
  margin-bottom: 20px;
}

.search-container input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
}

.search-container input[type="text"]:focus {
  outline: none;
}

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 14px;
}

.driver-list {
  max-width: 800px;
  margin: auto;
}

.tablee {
  border-collapse: collapse;
  width: 100%;
}

.tablee th,
.tablee td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tablee th {
  background-color: #128441;
  color: white;
}

.tablee tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tablee tbody tr:hover {
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
</style>