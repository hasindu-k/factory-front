<template>
  <PageHeader />
  <div class="text" v-if="!showModal">Fertilizer List</div>
  <div class="table-container">
    <div class="search-bar">
      <input
        type="text"
        class="form-control"
        placeholder="Search Fertilizer"
        v-model="searchTerm"
        @input="searchProducts"
      />
      <button type="button" class="btn btn-primary">Search</button>
    </div>

    <table class="table" v-if="!showModal">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Unit Price</th>
          <th scope="col">Unit</th>
          <th scope="col">Added Date</th>
          <th scope="col">Stock</th>
          <th scope="col">Last Update</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody v-if="filteredFertilizers.length > 0">
        <tr v-for="(fertilizer, index) in filteredFertilizers" :key="index">
          <td>{{ fertilizer.fId }}</td>
          <td>{{ fertilizer.fName }}</td>
          <td>{{ fertilizer.unitPrice }}</td>
          <td>{{ fertilizer.measurementUnit }}</td>
          <td>{{ fertilizer.creationDate }}</td>
          <td>{{ fertilizer.stockQuantity }}</td>
          <td>{{ fertilizer.lastUpdate }}</td>
          <td>
            <button
              type="button"
              class="btn btn-success"
              @click="editFertilizer(fertilizer)"
            >
              Update
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteFertilizer(fertilizer)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="6">No matching fertilizer found.</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary" @click="generateReport">
      Generate Report
    </button>
    <div v-if="editing">
      <EditFertilizer
        :fertilizer="fertilizerToEdit"
        @update="updateFertilizer"
        @cancel="cancelEdit"
      ></EditFertilizer>
    </div>

    <!-- Button to add a new product -->
    <button @click="navigateToAdd" class="btn btn-primary">
      Add Ferilizer
    </button>

    

    <!-- <div v-if="showModal" >
      <addFertilizer @add="addFertilizerToList" @cancel="closeModal" />
      </div>
      
      <div class="modal-content">
        <span @click="closeModal" class="close-button"></span>
        
    </div>

    <addFertilizer @addFertilizer="handleAddFertilizer" @cancel="closeModal" /> -->

    <!-- <button type="button" class="btn btn-primary" @click="addFertilizerClicked">
      ADD Fertilizer
    </button> -->
  </div>
  <!-- table-container -->
</template>

<script>
import EditFertilizer from "./editFertilizer.vue";
// import addFertilizer from "./addFertilizer.vue";
import PageHeader from "../PageHeaderManager.vue";

export default {
  name: "FertilizerList",
  data() {
    return {
      fertilizers: [],
      editing: false,
      adding: false,
      list: true,
      fertilizerToEdit: null,
      searchTerm: "",
      showModal: false, // Flag to control modal visibility
    };
  },
  computed: {
    filteredFertilizers() {
      return this.fertilizers.filter(
        (fertilizer) =>
          fertilizer.fName &&
          fertilizer.fName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    navigateToAdd() {
      this.$router.push("/ferilizer-form");
    },
    
    
    generateReport() {
      // Get the current date and time
      const currentDateTime = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });

      const companyName = "URUWELA TEA FACTORY";
      const companyAddress = "Uruwela Tea Factory, Akuressa, Matara";

      // Logo URL
      const logoUrl = "../assets/logoUruwala.png"; // Replace this URL with the actual URL of your logo image

      // Create the header section
      let headerHtml = `
      <div style="text-align: center; margin-bottom: 20px;">
        <img src="${logoUrl}" alt="Company Logo" style="width: 10+0px; height: auto; float: left; margin-right: 20px;">
        <div style="float: left;">
          <h1>FERTILIZER STOCK REPORT</h1>
          <p>Date: ${currentDateTime}</p>
          <h2>${companyName}</h2>
          <p>${companyAddress}</p>
        </div> 
        <div style="clear: both;"></div>
      </div>
    `;

      // Create a table header row
      let tableHtml = `
        ${headerHtml}
        <div style="width: 100%;">
        <table border="1">
          <tr>
            <th style="width: 10%; text-align: center;">Fertilizer ID</th>
            <th style="width: 15%; text-align: center;">Fertilizer Name</th>
            <th style="width: 10%; text-align: center;">Unit Price</th>
            <th style="width: 10%; text-align: center;">Available Stock</th>
            <th style="width: 15%; text-align: center;">Added Date</th>
            <th style="width: 15%; text-align: center;">Last Update</th>
          </tr>
        </div>
      `;

      // Iterate through all products and add each product's details to the table
      this.fertilizers.forEach((fertilizer) => {
        tableHtml += 
          `<tr>
            <td style="text-align: center;">${fertilizer.fId}</td>
            <td style="text-align: center;">${fertilizer.fName}</td>
            <td style="text-align: center;">${fertilizer.unitPrice}</td>
            <td style="text-align: center;">${fertilizer.stockQuantity}</td>
            <td style="text-align: center;">${fertilizer.creationDate}</td>
            <td style="text-align: center;">${fertilizer.lastUpdate}</td>
          </tr>`;
      });

      // Close the table tag
      tableHtml += "</table>";

      // Convert HTML table to PDF
      const opt = {
        margin: 1,
        filename: `FertilizerReport_${currentDateTime.replace(
          /[^\w\s]/gi,
          "_"
        )}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };

      // Use html2pdf library to convert HTML to PDF
      window.html2pdf().set(opt).from(tableHtml).save();
    },
    async fetchFertilizers() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Fertilizer/GetAllFertilizers"
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch fertilizers. Status: ${response.status}`
          );
        }

        const responseData = await response.json();
        this.fertilizers = responseData.filter(
          (fertilizer) => !fertilizer.deleted
        );
      } catch (error) {
        console.error("Error fetching fertilizers:", error);
        this.error = "Error fetching fertilizers. Please try again.";
      }
    },

    editFertilizer(fertilizer) {
      this.editing = true;
      this.list = false;
      this.fertilizerToEdit = fertilizer;
    },
    cancelEdit() {
      this.editing = false;
      this.fertilizerToEdit = null;
      this.list = true;
    },
    async updateFertilizer(updatedFertilizer) {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Fertilizer/UpdateFertilizer",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFertilizer),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to update fertilizer. Status: ${response.status}`
          );
        }

        this.fetchFertilizers();
        this.cancelEdit();
      } catch (error) {
        console.error("Error updating fertilizer:", error);
        // Handle error, display error message, etc.
      }
    },
    async deleteFertilizer(fertilizer) {
      try {
        const confirmed = window.confirm(
          "Are you sure you want to delete this fertilizer?"
        );
        if (!confirmed) return; // If user cancels, do nothing

        const response = await fetch(
          `http://localhost:5154/api/Fertilizer/DeleteFertilizer/${fertilizer.fId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to delete fertilizer. Status: ${response.status}`
          );
        }

        this.fetchFertilizers(); // Refresh the list after deletion
      } catch (error) {
        console.error("Error deleting fertilizer:", error);
        // Handle error, display error message, etc.
      }
    },
  },
  mounted() {
    this.fetchFertilizers();
  },
  components: {
    EditFertilizer,
    // addFertilizer,
    PageHeader,
  },
};
</script>

<style scoped>
body {
  margin-top: 10px;
}
.text {
  font-size: 24px;
  font-weight: bold;
  margin-top: 0px;
  margin-bottom: 30px;
  color: black;
}

.btn {
  margin-right: 10px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
