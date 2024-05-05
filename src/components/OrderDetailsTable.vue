<template>
  <div class="page-container">
    <div class="header">
      <PageHeader/>
    </div>
    <div class="back-button-container">
  <router-link to="/" class="back-button small">Back to Dashboard</router-link>
</div>

    <div class="background"></div> <!-- Background image with opacity -->
    <div class="order-table-container">
      <h2>Order Details</h2>
      <div class="search-container">
        <input type="text" v-model="searchQuery" placeholder="Search by item name or order state" class="form-control">
      </div>
      <div class="report-button-container">
        <button @click="generateReport" class="btn btn-primary">Generate PDF Report</button>
      </div>
      <div class="table-responsive">
        <table class="table table-dark table-striped-columns">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Order State</th>
              <th>Order Date</th>
              <th>Supplier ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in filteredOrders" :key="index">
              <td>{{ order.orderID }}</td>
              <td>{{ order.itemName }}</td>
              <td>{{ order.quantity }}</td>
              <td>{{ order.unitPrice }}</td>
              <td>{{ order.orderState }}</td>
              <td>{{ order.orderDate }}</td>
              <td>{{ order.supplierID }}</td>
              <td>
                <div class="btn-group">
                  <button @click="editOrder(order)" class="btn btn-warning">Update</button>
                  <button @click="deleteOrder(order.orderID)" class="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br><br>
      <router-link to="/order-details-form" class="btn btn-success">Back to Form</router-link>
      
    </div>
    
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
      orders: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredOrders() {
      const query = this.searchQuery.toLowerCase().trim();
      return this.orders.filter(order =>
        order.itemName.toLowerCase().includes(query) ||
        order.orderState.toLowerCase().includes(query)
      );
    }
  },
  mounted() {
    this.retrieveOrder();
  },
  methods: {
    async retrieveOrder() {
      try {
        const response = await fetch("http://localhost:5154/api/Order");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        this.orders = data;
      } catch (error) {
        console.error("Error retrieving orders:", error);
      }
    },
    editOrder(order) {
      const router = this.$router;
      if (router) {
        router.push({ name: 'OrderDetailsUpdate', params: { id: order.orderID }, query: order });
      } else {
        console.error("Router instance is undefined.");
      }
    },
    async deleteOrder(orderID) {
      const confirmDelete = window.confirm("Are you sure you want to delete this order?");
      if (!confirmDelete) {
        return;  
      }
      
      try {
        const response = await fetch(`http://localhost:5154/api/Order/${orderID}`, {
          method: "DELETE"
        });
        if (!response.ok) {
          throw new Error("Failed to delete order");
        }
        
        this.orders = this.orders.filter(order => order.orderID !== orderID);
        alert("Order deleted successfully!");
      } catch (error) {
        console.error("Error deleting order:", error);
        alert("Error deleting order. Please try again.");
      }
    },
    generateReport() {
      const currentDateTime = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const tableHtml = this.constructTableHtml();

      const options = {
        margin: 1,
        filename: `OrderDetailsReport_${currentDateTime.replace(/[^\w\s]/gi, "_")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };

      html2pdf().set(options).from(tableHtml).save();
    },
    constructTableHtml() {
      let tableHtml = `
        <h2>Order Details Report</h2>
        <div style="width: 100%;">
          <table border="1">
          <thead>
            <tr>
              <th style="width: 10%; text-align: center;">Order ID</th>
              <th style="width: 10%; text-align: center;">Item Name</th>
              <th style="width: 10%; text-align: center;">Quantity</th>
              <th style="width: 10%; text-align: center;">Unit Price</th>
              <th style="width: 10%; text-align: center;">Order State</th>
              <th style="width: 10%; text-align: center;">Order Date</th>
              <th style="width: 10%; text-align: center;">Supplier ID</th>
            </tr>
          </thead>
          <tbody>
      `;

      this.filteredOrders.forEach((order) => {
        tableHtml += `
          <tr>
            <td style="text-align: center;">${order.orderID}</td>
            <td style="text-align: center;">${order.itemName}</td>
            <td style="text-align: center;">${order.quantity}</td>
            <td style="text-align: center;">${order.unitPrice}</td>
            <td style="text-align: center;">${order.orderState}</td>
            <td style="text-align: center;">${order.orderDate}</td>
            <td style="text-align: center;">${order.supplierID}</td>
          </tr>
        `;
      });

      tableHtml += `
          </tbody>
        </table>
      `;

      return tableHtml;
    },
  },
};
</script>

<style scoped>
.page-container {
  position: relative; /* Position relative for the background image */
}

.header {
  margin-bottom: 20px;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw; /* Adjusted to cover the full viewport width */
  height: 100vh; /* Adjusted to cover the full viewport height */
  /* background-image: url('/src/assets/img1.png');  */
  background-color: aliceblue;
  background-size: cover;
  background-position: center;
  z-index: -1;
  opacity: 0.5; /* Opacity for the background image */
}

.order-table-container {
  margin: auto;
  padding: 20px;
  border-radius: 10px;
}

.search-container {
  margin-bottom: 20px;
}

.btn-primary {
  margin-top: 20px;
}

.back-button {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}

.btn-danger,
.btn-warning {
  padding: 8px 12px;
  font-size: 14px;
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
</style>
