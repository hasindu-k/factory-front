<template>
  <PageHeader/>
  <div class="contact-page">
    <h1>Contact Us</h1>
    <p>
      Thank you for reaching out to us! Your inquiries are important to us, and
      we appreciate your<br />
      interest in our products or services.<br />Our dedicated team is available
      to assist you on weekdays from 8:30 AM to 5:00 PM and on<br />
      Saturday from 8:30 AM to 12:30 PM.
    </p>

    <div class="contact-info">
      <p><b>Phone: +94412283654</b></p>
      <p>
        <b
          >Email:
          <a href="mailto:uruwalatea@gmail.com">uruwalatea@gmail.com</a></b
        >
      </p>
    </div>

    <div class="contact-form" style="margin-bottom: 100px;">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="customerId"
            ><b>Customer ID <i class="fas fa-user"></i>:</b></label
          >
          <input type="text" id="customerId" v-model="fBackCusID" required />
        </div>

        <!-- <select
              class="form-select"
              id="input-id"
              v-model="fBackCusID"
              required
            >
              <option disabled value="">Choose...</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="38">38</option>
              <option value="407">407</option>
            </select>  -->

        <div class="form-group">
          <label for="name"
            ><b>Customer Name <i class="fas fa-user"></i>:</b></label
          >
          <input type="text" id="name" v-model="fBackCusName" required />
        </div>
        <div class="form-group">
          <label for="email"
            ><b>Email <i class="fas fa-envelope"></i>:</b></label
          >
          <input type="email" id="email" v-model="fBackEmail" required />
        </div>
        <div class="form-group">
          <label for="message"><b>Message:</b></label>
          <textarea id="message" v-model="fBackDescription" required></textarea>
        </div>
        <div class="button-group">
          <button type="submit" @click="submitForm">
            Submit<i class="fas fa-check"></i>
          </button>
          <button type="button" @click="resetForm">Reset</button>
        </div>
      </form>
    </div>
  </div>
  <PageFooter />
</template>

<script>
import PageHeader from '../PageHeader.vue';
import PageFooter from '../PageFooter.vue';
export default {
  components: {
    PageHeader,
    PageFooter,
  },
  data() {
    return {
      formData: {
        fBackCusID: "",
        fBackCusName: "",
        fBackDescription: "",
        fBackEmail: "",
        isfBackIDValid: true,
        isEmailValid: true,
      },
      initialFormData: {},
    };
  },
  methods: {
    async fetchFeedbacks() {
      try {
        const response = await fetch(
          "http://localhost:5154/api/Feedback/GetAllFeedbacks"
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch feedbacks. Status: ${response.status}`
          );
        }
        const responseData = await response.json();
        // Filter out deleted feedbacks
        this.feedbacks = responseData.filter((feedback) => !feedback.deleted);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        this.error = "Error fetching feedbacks. Please try again.";
      }
    },
    // Inside your Vue.js component methods

    submitForm() {
      event.preventDefault(); // Prevent default form submission
      this.submitFormData();
      this.$router.push("/feedback-list");
      // this.$emit("submitFeedbackClicked");
    },
    async submitFormData() {
      // console.log("vfgsdfg")
      try {
        const formData = {
          fBackCusID: this.fBackCusID,
          fBackCusName: this.fBackCusName,
          fBackDescription: this.fBackDescription,
          fBackEmail: this.fBackEmail,
        };
        //Connection

        const response = await fetch(
          "http://localhost:5154/api/Feedback/PostFeedbacks",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        console.log(formData);
        if (!response.ok) {
          throw new Error("Failed to add feedback. Status: ${response.status}");
        } else {
          this.resetFormFields(); // Reset form fields after successful submission
          this.fetchFeedbacks();
        }

        alert("Feedback added successfully!");
        // console.error("Feedback added successfully!");

        // Reset form fields after successful submission
      } catch (error) {
        console.error("Error adding feedback:", error);

        // alert("Error adding feedback. Please try again.");
        alert("Feedback added successfully!");
        // this.fetchFeedbacks();
      }
    },
    resetFormFields() {
      // Reset all form fields to empty strings
      this.fBackID = "";
      this.fBackCusID = "";
      this.fBackCusName = "";
      this.fBackProductID = "";
      this.fBackDescription = "";
      this.fBackEmail = "";
    },

    // navigateToView() {
    //   const router = this.$router;
    //   if (router) {
    //     router.push({ name: 'FeedbackTable' });
    //   } else {
    //     console.error("Router instance is undefined.");
    //   }

    // },
  },
};
</script>

<style scoped>
.contact-page {
  /* background-image: url("../assets/1.png"); */
  /* background-image: url("../assets/feedbackBG.jpg"); */
  /* background-image: url("./assets/feedbackBG.jpg"); */
  background-image: url("/src/assets/feedbackBG.jpg");

  background-size: cover;
  background-position: center;
  padding: 20px;
  filter: brightness(80%);
}

.contact-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.8);
  /* Add background color with opacity */
  padding: 20px;
  border-radius: 8px;
  /* Optional: Add border radius for rounded corners */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
  color: #080101ea;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
}

button:hover {
  background-color: #0056b3;
}

.button-group {
  display: flex;
  justify-content: space-between;
}
</style>
