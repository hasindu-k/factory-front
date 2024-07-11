<template>
  <PageHeader />
  <div class="payTransaction-table">
    <h2>Transaction Details</h2>
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by transactionID or customerID"
      />
    </div>
    <table class="table table-striped tea-table">
      <thead>
        <tr>
          <th>TransactionID</th>
          <th>CustomerID</th>
          <th>ProductID</th>
          <th>PaymentMethod</th>
          <th>Amount</th>
          <th>Timestamp</th>
          <!-- <th>Actions</th> -->
        </tr>
      </thead>
      <tbody v-if="filteredTransactions.length > 0">
        <tr
          v-for="transaction in filteredTransactions"
          :key="transaction.transactionID"
        >
          <td>{{ transaction.transactionID }}</td>
          <td>{{ transaction.customerID }}</td>
          <td>{{ transaction.productID }}</td>
          <td>{{ transaction.paymentMethod }}</td>
          <td>{{ transaction.amount }}</td>
          <td>{{ transaction.timestamp }}</td>
          <!-- <td>
            <button
              @click="deleteTransaction(transaction.TransactionID)"
              class="btn btn-danger"
            >
              Delete</button
            ><br /><br />
            <button
              @click="updateTransaction(transaction)"
              class="btn btn-warning"
            >
              Update
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
    <br />
    <br />
    <router-link to="/manager-dashboard" class="back-button">Back to Dashboard</router-link>
  </div>
</template>

<script>
import PageHeader from "../PageHeaderManager.vue";

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      transactions: [],
      searchQuery: "",
    };
  },
  computed: {
    filteredTransactions() {
      const query = parseInt(this.searchQuery.trim());
      if (isNaN(query)) {
        return this.transactions;
      }
      return this.transactions.filter(
        (transaction) => transaction.transactionID === query
      );
    },
  },
  mounted() {
    this.retrieveTransactions();
  },
  methods: {
    async retrieveTransactions() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Payment/GetAllPayments"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        this.transactions = data;
      } catch (error) {
        console.error("Error retrieving transactions:", error);
        // You can display a user-friendly error message here
      }
    },
    async deleteTransaction(transactionID) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this transaction?"
      );
      if (!confirmDelete) {
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5154/api/Payment/DeletePayment?transactionID=${transactionID}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete transaction");
        }

        this.transactions = this.transactions.filter(
          (transaction) => transaction.transactionID == transactionID
        );
        alert("Transaction deleted successfully!");
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Error deleting transaction. Please try again.");
      }
    },
    async updateTransaction(transaction) {
      this.isEditting = true; // Flag to indicate editing mode (optional)
      this.editedTransaction = { ...transaction }; // Copy for editing

      // Implement logic to populate a form or editing area with transaction details
      // This could involve using v-model on form elements and setting their initial values
    },
    async saveEditedTransaction() {
      if (
        !this.editedTransaction ||
        !this.editedTransaction.name ||
        !this.editedTransaction.amount ||
        !this.editedTransaction.date
      ) {
        alert("Please fill in all required fields.");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5154/api/Payment/UpdatePayment",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(this.editedTransaction),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update transaction");
        }

        const updatedTransaction = await response.json();
        const transactionIndex = this.transactions.findIndex(
          (t) => t.TransactionID === this.editedTransaction.TransactionID
        );
        if (transactionIndex !== -1) {
          this.transactions.splice(transactionIndex, 1, updatedTransaction);
        }

        this.isEditting = false; // Exit editing mode (optional)
        alert("Transaction updated successfully!");
      } catch (error) {
        console.error("Error updating transaction:", error);
        alert("Error updating transaction. Please try again.");
      }
    },
    cancelEdit() {
      this.isEditting = false; // Exit editing mode (optional)
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

.supplier-table {
  max-width: 800px;
  margin: auto;
}

.tea-table {
  border-collapse: collapse;
  width: 100%;
}

.tea-table th,
.tea-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tea-table th {
  background-color: #128441;
  color: white;
}

.tea-table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tea-table tbody tr:hover {
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
