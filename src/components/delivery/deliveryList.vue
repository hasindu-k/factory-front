<template>
  <div class="delivery-list">
    <h2>delivery List</h2>

    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by Delivery ID"
      />
    </div>

    <table class="table table-striped tabledelivery">
      <thead>
        <tr>
          <th>Delivery ID</th>
          <th>Delivery Date</th>
          <th>Driver Id</th>
          <th>Customer Name</th>
          <th>Contact Number</th>
          <th>Address</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(delivery, index) in filteredDeliveries" :key="index">
          <td>{{ delivery.deliveryId }}</td>
          <td>{{ delivery.deliveryDate }}</td>
          <td>{{ delivery.driverId }}</td>
          <td>{{ delivery.cusName }}</td>
          <td>{{ delivery.cusContact }}</td>
          <td>{{ delivery.cusaddress }}</td>
          <td>{{ delivery.delStatus }}</td>

          <td>
            <button @click="deleteDelivery(delivery)" class="btn btn-danger">
              Delete</button
            ><br /><br />

            <router-link
              :to="{
                name: 'editDelivery',
                params: { id: delivery.deliveryId },
                query: delivery,
              }"
            >
              <button class="btn btn-warning">Update</button>
            </router-link>
            <!-- <button @click="updateDelivery(delivery)" class="btn btn-warning">
              Update
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
    <br />
    <br />

    <router-link to="/add-delivery-form" class="back-button"
      >Back to Form</router-link
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliveries: [],
      searchQuery: "",
    };
  },

  computed: {
    filteredDeliveries() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.deliveries.filter((delivery) =>
        delivery.deliveryId.toString().includes(query)
      );
    },
  },

  mounted() {
    this.retrieveDeliveries();
  },

  // created() {

  //   this.fetchDeliveryList();
  // },
  methods: {
    async retrieveDeliveries() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Delivery/GetAlldeliveries" //changee
        );
        if (!response.ok) {
          throw new Error("Error fetching delivery details");
        }
        const data = await response.json();
        this.deliveries = data;
      } catch (error) {
        console.error("Error fetching delivery details:", error);
        // this.showToastMessage("Error fetching delivery details");
      }
    },

    async deleteDelivery(delivery) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this delivery?"
      );
      if (!confirmDelete) {
        return;
      }
      // console.log(delivery);

      try {
        const response = await fetch(
          `http://localhost:5154/api/Delivery/Deletedelivery?deliveryId=${delivery.deliveryId}`, //changeee
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        if (!response.ok) {
          // Check for HTTP errors
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        this.deliveries = this.deliveries.filter(
          (del) => del.deliveryId !== delivery.deliveryId
        );

        alert("Delivery deleted successfully!");
      } catch (error) {
        console.error("Error deleting delivery:", error);
        alert(`Error deleting delivery: ${error.message}`);
      }
      this.retrieveDeliveries(); //refresh list
    },

    //change updateee
    updateDelivery(delivery) {
      console.log("Update button clicked for delivery:", delivery);

      const router = this.$router;
      if (router) {
        router.push({
          name: "editDelivery",
          params: { id: delivery.deliveryId },
          query: delivery,
        });
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

.delivery-list {
  /* max-width: 1000px; */
  width: 100%;
  margin: auto;
}

.tabledelivery {
  border-collapse: collapse;
  width: 100%;
}

.tabledelivery th,
.tabledelivery td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabledelivery th {
  background-color: #128441;
  color: white;
}

.tabledelivery tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tabledelivery tbody tr:hover {
  background-color: #e0f2f1;
}

.back-button {
  position: absolute;
  top: 30px;
  right: 40px;
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
