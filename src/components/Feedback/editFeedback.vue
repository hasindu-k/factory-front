<template>
  <div class="edit-course-modal">
    <div class="edit-course">
      <h2>Edit Feedback</h2>

      <form @submit.prevent="update">
        <div class="form-group">
          <label for="fBackCusID">Customer ID:</label>
          <input v-model="editedFeedback.fBackCusID" type="text" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="fBackCusName">Customer Name:</label>
          <input v-model="editedFeedback.fBackCusName" type="text" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="fBackEmail">Email:</label>
          <input v-model="editedFeedback.fBackEmail" type="email" class="form-control" required>
        </div>

        <div class="form-group">
          <label for="fBackDescription">Message:</label>
          <input v-model="editedFeedback.fBackDescription" type="text" class="form-control" required>
        </div>

        <div class="form-group">
          <button type="submit" class="btn btn-primary">Update Feedback</button>
          <button type="button" @click="cancel" class="btn btn-secondary">Cancel</button>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedFeedback: {} // Initialize as an empty object
    };
  },
  methods: {
    update() {
      this.$emit('update', this.editedFeedback);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
  mounted() {
    // Populate editedFeedback with feedback prop when component is mounted
    this.editedFeedback = Object.assign({}, this.feedback);
  },
};
</script>

<style scoped>
.edit-course-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-course {
  background: white;
  padding: 25px;
  border-radius: 8px;
}

/* Style for labels inside .edit-course */
.edit-course label {
  display: block;
  margin-bottom: 0.5rem;
  color: #080101ea;
}

/* Additional styles for input fields, if needed */
.edit-course input[type="text"],
.edit-course input[type="email"],
.edit-course textarea {
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
