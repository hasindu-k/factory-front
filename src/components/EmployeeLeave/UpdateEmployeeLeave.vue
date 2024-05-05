<template>
  <div class="frame">
    <div class="div-wrapper">
      <div class="text-wrapper">Edit Leave</div>
    </div>

    <form @submit.prevent="update">
      <div class="div-2">
        <div class="form-container">
          <div class="mb-3 mt-3">
            <label for="input-employee-id" class="form-label">Employee ID</label>
            <input type="number" class="form-control" id="input-employee-id" v-model="editedLeave.employeeId" />
          </div>

          <div class="mb-3">
            <label for="input-department-id" class="form-label">Department ID</label>
            <input type="number" class="form-control" id="input-department-id" v-model="editedLeave.departmentId" />
          </div>

          <div class="mb-3">
            <label for="input-  -type" class="form-label">Leave Type</label>
            <input type="text" class="form-control" id="input-leave-type" v-model="editedLeave.leave_type" />
          </div>

          <div class="mb-3">
            <label for="input-number-of-days" class="form-label">Number of Days</label>
            <input type="number" class="form-control" id="input-number-of-days" v-model="editedLeave.noofLeaveDays" />
          </div>

          <div class="button-wrapper">
            <button type="submit" class="btn btn-success">Edit</button>
            <button type="button" class="btn btn-danger" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedLeave: { ...this.employee },
    };
  },
  methods: {
    update() {
      this.$emit('update', this.editedLeave);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.frame {
  align-items: flex-start;
  border-radius: 36px;
  display: inline-flex;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  width: 1243px;
}
.frame .div-wrapper {
  background: linear-gradient(
    135deg,
    rgb(66.9, 232.69, 73.53) 0%,
    rgb(70.1, 96.69, 71.16) 100%
  );
  border: 1px solid;
  border-color: #e3baba;
  height: 695px;
  position: relative;
  width: 548px;
}
.frame .text-wrapper {
  color: #ffffff;
  font-family: "Montserrat-Seimibold", Helvetica;
  font-size: 48px;
  font-weight: 600;
  height: 41px;
  left: 76px;
  letter-spacing: 0;
  line-height: 41px;
  position: absolute;
  top: 326px;
  white-space: nowrap;
}

/* Styles for form elements */
.form-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.form-container {
  padding: 20px;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.button-wrapper button {
  margin: 5px 10px; /* Adjust margins as needed */
}

</style>