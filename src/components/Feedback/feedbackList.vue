<template>
    <PageHeader />
    <div class="feedback-list" v-if="list">
        <h1>Feedback List</h1>
        <div class="feedback-table">
            <!-- Search bar -->
            <div class="search-bar">
                <input type="text" class="form-control" placeholder="Search Feedback" v-model="searchTerm"
                    style="padding: 10px;" />
                <button type="button" class="btn btn-primary">Search</button>
            </div>
            <!-- Table to display feedbacks -->
            <table>
                <thead>
                    <tr>
                        <th>Feedback ID</th>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Description</th>
                        <th style="text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody v-if="filteredFeedbacks.length > 0">
                    <tr v-for="(feedback, index) in filteredFeedbacks" :key="index">
                        <td>{{ feedback.fBackID }}</td>
                        <td>{{ feedback.fBackCusID }}</td>
                        <td>{{ feedback.fBackCusName }}</td>
                        <td>{{ feedback.fBackEmail }}</td>
                        <td>{{ feedback.fBackDescription }}</td>
                        <td>
                            <!-- Pass the feedback item to editFeedback method -->
                            <button type="button" class="btn btn-success" @click="editFeedback(feedback)">
                                Update
                            </button>
                            <button type="button" class="btn btn-danger delete-btn" @click="deleteFeedback(feedback)">
                                Delete
                            </button>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="6">No Matching FeedBacks</td>
                    </tr>
                </tbody>
            </table>
            <!-- EditFeedback component to edit selected feedback -->
            <div v-if="editing">
                <EditFeedback :feedback="feedbackToEdit" @update="updateFeedback" @cancel="cancelEdit"></EditFeedback>
            </div>
        </div>
        <button @click="generateReport">Generate Feedback Report</button>
    </div>
</template>

<script>
import PageHeader from '../PageHeaderManager.vue';
import EditFeedback from './editFeedback.vue'; // Import EditFeedback component

export default {
    components: {
        EditFeedback,
        PageHeader,
    },
    data() {
        return {
            feedbacks: [], // Array to store feedback items
            feedbackToEdit: null,
            editing: false,
            list: true,
            searchTerm: "",
        };
    },
    computed: {
        filteredFeedbacks() {
            return this.feedbacks.filter((feedback) =>
                feedback.fBackCusName.toLowerCase().includes(this.searchTerm.toLowerCase())
            );
        },
    },
    methods: {
        // Fetch feedbacks from the API
        async fetchFeedbacks() {
            try {
                const response = await fetch("http://localhost:5154/api/Feedback/GetAllFeedbacks");
                if (!response.ok) {
                    throw new Error(`Failed to fetch feedbacks. Status: ${response.status}`);
                }
                const responseData = await response.json();
                // Filter out deleted feedbacks
                this.feedbacks = responseData.filter(feedback => !feedback.deleted);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                this.error = "Error fetching feedbacks. Please try again.";
            }
        },
        // Update feedback
        async updateFeedback(updatedFeedback) {
            try {
                console.log("Updated Feedback:", updatedFeedback);
                const response = await fetch("http://localhost:5154/api/FeedbackCustomer/UpdateCusFeedbacks", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFeedback),
                });

                if (!response.ok) {
                    throw new Error(`Failed to update feedback. Status: ${response.status}`);
                }

                this.fetchFeedbacks(); // Refresh feedback list after update
                this.cancelEdit(); // Cancel edit mode
            } catch (error) {
                console.error("Error updating feedback:", error);
                // Handle error, display error message, etc.
            }
        },
        // Delete feedback
        async deleteFeedback(feedback) {
            try {
                const confirmed = window.confirm("Are you sure you want to delete this feedback?");
                if (!confirmed) return; // If user cancels, do nothing

                const response = await fetch(`http://localhost:5154/api/Feedback/DeleteFeedback/${feedback.fBackID}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error(`Failed to delete feedback. Status: ${response.status}`);
                }

                this.fetchFeedbacks(); // Refresh feedback list after deletion
            } catch (error) {
                console.error("Error deleting feedback:", error);
                // Handle error, display error message, etc.
            }
        },
        // Generate feedback report

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
        <h1>FEEDBACK REPORT</h1>
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
          <th style="width: 10%; text-align: center;">Feedback ID</th>
          <th style="width: 15%; text-align: center;">Customer ID</th>
          <th style="width: 10%; text-align: center;">Customer Name</th>
          <th style="width: 10%; text-align: center;">Email</th>
          <th style="width: 15%; text-align: center;">Description</th>
        </tr>
      </div>
    `;

            // Iterate through all products and add each product's details to the table
            this.feedbacks.forEach((feedback) => {
                tableHtml += `
        <tr>
          <td style="text-align: center;">${feedback.fBackID}</td>
          <td style="text-align: center;">${feedback.fBackCusID}</td>
          <td style="text-align: center;">${feedback.fBackCusName}</td>
          <td style="text-align: center;">${feedback.fBackEmail}</td>
          <td style="text-align: center;">${feedback.fBackDescription}</td> 
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
        // Edit feedback
        editFeedback(feedback) {
            this.editing = true;
            this.feedbackToEdit = { ...feedback }; // Copy feedback data to ensure two-way binding
        },
        // Cancel editing
        cancelEdit() {
            this.editing = false;
            this.feedbackToEdit = null;
        },
    },
    mounted() {
        this.fetchFeedbacks(); // Fetch feedbacks when component is mounted
    },
};
</script>

<style scoped>
.feedback-list {
    padding: 20px;
}

.feedback-table {
    margin-bottom: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.delete-btn {
    background-color: #dc3545;
}

.search-bar {
    display: inline-block;
    justify-content: space-between;
    margin-bottom: 20px;
}
</style>