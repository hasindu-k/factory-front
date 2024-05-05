<template>
    <div class="feedback-list" v-if="list">
      <h1>Feedback List</h1>
      <div class="feedback-table">
        <!-- Search bar -->
        <div class="search-bar">
          <input type="text" class="form-control" placeholder="Search Feedback" v-model="searchTerm" style="padding: 10px;" />
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
  import EditFeedback from './editFeedback.vue'; // Import EditFeedback component
  
  export default {
    components: {
      EditFeedback
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
          const response = await fetch("http://localhost:5212/api/Feedback/GetAllFeedbacks");
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
          const response = await fetch("http://localhost:5212/api/FeedbackCustomer/UpdateCusFeedbacks", {
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
  
          const response = await fetch(`http://localhost:5212/api/Feedback/DeleteFeedback/${feedback.fBackID}`, {
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
        // Code to generate PDF report
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
  