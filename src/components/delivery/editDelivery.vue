<template>
  <div class="delivery-update">
    <h2>Update Delivery</h2>
    <form @submit.prevent="submitForm">
      <label for="deliveryDate">Delivery Date:</label>
      <input
        type="text"
        id="deliveryDate"
        v-model="deliveryDate"
        required
        placeholder="YYYY-MM-DD"
      />

      <label for="driverId">Driver ID:</label>
      <input type="text" id="driverId" v-model="driverId" required />
      <br /><br />

      <label for="delStatus">Delivery Status:</label>
      <select class="form-group" id="input-id" v-model="delStatus" required>
        <option disabled value="">Choose...</option>
        <option value="1">Delivered</option>
        <option value="2">Processing</option>
        <option value="3">Dispatched</option>
        <option value="4">Returned</option>
        <option value="5">Cancelled</option>
      </select>
      <br />
      <br />

      <label for="cusName">Customer Name:</label>
      <input type="text" id="cusName" v-model="cusName" required />
      <br /><br />

      <label for="cusContact">Customer Contact:</label>
      <input type="text" id="cusContact" v-model="cusContact" required />
      <br /><br />

      <label for="cusaddress">Customer Address:</label>
      <input type="text" id="cusaddress" v-model="cusaddress" required />
      <br /><br />
      <!-- <input type="text" id="delStatus" v-model="delStatus" required> -->

      <button type="submit">Update</button><br /><br />

      <!-- Navigation button to view details -->
      <button @click="navigateToView">View Details</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deliveryId: "",
      deliveryDate: "",
      driverId: "",
      cusName: "",
      cusContact: "",
      cusaddress: "",
      delStatus: "",
    };
  },

  mounted() {
    this.deliveryId = this.$route.params.id;
    this.deliveryDate = this.$route.query.deliveryDate;
    this.driverId = this.$route.query.driverId;
    this.cusName = this.$route.query.cusName;
    this.cusContact = this.$route.query.cusContact;
    this.cusaddress = this.$route.query.cusaddress;
    this.delStatus = this.$route.query.delStatus;

    this.retrieveDelivery();
  },
  methods: {
    async retrieveDelivery() {
      try {
        const deliveryId = this.$route.params.id;
        console.log("Delivery Id:", deliveryId);

        const response = await fetch(
          `http://localhost:5154/api/Delivery/Updatedeliveries/deliveryId=${this.deliveryId}`
        );
        if (!response.ok) {
          throw new Error("Failed to retrieve delivery details");
        }

        const data = await response.json();

        this.deliveryId = data.deliveryId;
        this.deliveryDate = data.deliveryDate;
        this.driverId = data.driverId;
        this.cusName = data.cusName;
        this.cusContact = data.cusContact;
        this.cusaddress = data.cusaddress;
        this.delStatus = data.delStatus;

        console.log(
          "Form field values :",
          this.deliveryDate,
          this.driverId,
          this.cusName,
          this.cusContact,
          this.cusaddress,
          this.delStatus
        );
      } catch (error) {
        console.error("Error retrieving delivery details:", error);
      }
    },

    async submitForm() {
      try {
        const formData = {
          deliveryId: this.deliveryId,
          deliveryDate: this.deliveryDate,
          driverId: this.driverId,
          cusName: this.cusName,
          cusContact: this.cusContact,
          cusaddress: this.cusaddress,
          delStatus: this.delStatus,
        };

        ///${this.$route.params.id}
        const response = await fetch(
          `http://localhost:5154/api/Delivery/Updatedeliveries/${this.$route.params.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update delivery");
        }
        console.log(formData);
        alert("Delivery updated successfully!");

        this.$router.push({ name: "deliveryList" });
      } catch (error) {
        console.error("Error updating delivery:", error);

        alert("Error adding delivery. Please try again.");
      }
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
.delivery-update {
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

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  box-sizing: border-box;
  appearance: none; /* Remove default arrow */
  -webkit-appearance: none; /* Remove default arrow for Safari */
  -moz-appearance: none; /* Remove default arrow for Firefox */
  background-image: url('data:image/svg+xml;utf8,<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'); /* Add custom arrow */
  background-repeat: no-repeat;
  background-position: right 10px top 50%;
  background-size: 24px auto;
  font-size: 16px;
  line-height: 1.5;
  cursor: pointer;
  outline: none;
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

button[type="submit"] {
  background-color: #007bff;
}

button[type="submit"]:hover {
  background-color: #0056b3;
}
</style>
