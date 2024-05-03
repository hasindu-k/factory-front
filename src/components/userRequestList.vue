<template>
    <div class="text">User Request List</div>
  <div class="table-container">
    <div class="search-bar">
        <input type="text" class="form-control" placeholder="Search Request" />
        <button type="button" class="btn btn-primary">Search</button>
    </div>
    
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Requested by</th>
          <th scope="col">Request Date</th>
          <th scope="col">Item</th>
          <th scope="col">Quantity</th>
          <th scope="col">Weather</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
          <td>
            <button type="button" class="btn btn-success">Check Weather</button>
        </td>
        <td>
            <button type="button" class="btn btn-warning">Suggest</button>
        </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary">Generate Report</button>
   </div> <!-- table-container -->
</template>

<script>
export default {
  name: "FertilizerList",
  data() {
    return {
      // Your component's data goes here
    };
  },
  methods: {
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
          tableHtml += `
        <tr>
          <td style="text-align: center;">${fertilizer.fId}</td>
          <td style="text-align: center;">${fertilizer.fName}</td>
          <td style="text-align: center;">${fertilizer.unitPrice}</td>
          <td style="text-align: center;">${fertilizer.stockQuantity}</td>
          <td style="text-align: center;">${fertilizer.creationDate}</td> //edited
          <td style="text-align: center;">${fertilizer.lastUpdate}</td>
        </tr>
      `;
        });

        // Close the table tag
        tableHtml += "</table>";

        // Convert HTML table to PDF
        const opt = {
          margin: 1,
          filename: `StockReport_${currentDateTime.replace(
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
            "http://localhost:5030/api/Fertilizer/GetAllFertilizers"
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
  },
  computed: {
    // Your computed properties go here
  },
  mounted() {
    // Code to run when the component is mounted goes here
  },
};
</script>

<style scoped>
.text {
    font-size: 24px;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 30px;
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
