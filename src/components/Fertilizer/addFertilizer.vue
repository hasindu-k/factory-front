<template>
  <div class="frame" style="margin-top: 100px;">
    <div class="div-wrapper">
      <div class="text-wrapper">ADD Fertilizer</div>
    </div>
    <div class="div-2">
      <div class="form-container">
        <div class="mb-3">
          <label for="input-fertilizer-name" class="form-label"
            >Fertilizer Name</label
          >
          <input
            type="text"
            class="form-control"
            id="input-fertilizer-name"
            v-model="fName"
            required
          />
          <div class="invalid-feedback" v-if="!fName">
            Fertilizer name is required.
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Application Method</label>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="dry-apply"
              value="Dry apply"
              v-model="applicationMethod"
              required
            />
            <label class="form-check-label" for="dry-apply">Dry apply</label>
          </div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              id="wet-apply"
              value="Wet apply"
              v-model="applicationMethod"
              required
            />
            <label class="form-check-label" for="wet-apply">Wet apply</label>
          </div>
          <div class="invalid-feedback" v-if="!applicationMethod">
            Please select an application method.
          </div>
        </div>

        <div class="price-quantity">
          <div class="mb-3">
            <label for="input-price" class="form-label">Price</label>
            <!-- <input
              type="number"
              class="form-control"
              id="input-price"
              v-model="unitPrice"
              required
            /> -->
            <select
              class="form-select"
              id="input-price"
              v-model="unitPrice"
              required
            >
              <option disabled value="">Choose...</option>
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
            </select>

            <div class="invalid-feedback" v-if="!price">Price is required.</div>
          </div>
          <div class="mb-3">
            <label for="input-quantity" class="form-label"
              >Stock Quantity</label
            >
            <input
              type="number"
              class="form-control"
              id="input-quantity"
              v-model="stockQuantity"
              required
            />
            <div class="invalid-feedback" v-if="!stockQuantity">
              Stock quantity is required.
            </div>
          </div>
        </div>

        <div class="mb-3">
          <label for="input-measurement-unit" class="form-label"
            >Measurement Unit</label
          >
          <select
            class="form-select"
            id="input-measurement-unit"
            v-model="measurementUnit"
            required
          >
            <option disabled value="">Choose...</option>
            <option value="Liter">Liter</option>
            <option value="Kilogram">Kilogram</option>
          </select>
          <div class="invalid-feedback" v-if="!measurementUnit">
            Measurement unit is required.
          </div>
        </div>

        <div class="mb-3">
          <label for="input-fertilizer-desc" class="form-label"
            >Fertilizer Description</label
          >
          <textarea
            class="form-control"
            id="input-fertilizer-desc"
            rows="4"
            v-model="description"
            required
          ></textarea>
          <div class="invalid-feedback" v-if="!description">
            Fertilizer description is required.
          </div>
        </div>

        <div class="button-wrapper">
          <button type="button" class="btn btn-success" @click="addFertilizer">
            Add
          </button>
          <button @click="navigateToView">View Details <i class="fas fa-eye"></i></button>
          <button type="button" class="btn btn-danger" @click="cancel">
            Cancel
          </button>
        </div>
      </div>
      <!-- form-container -->
    </div>
  </div>
</template>

<!-- <script>
export default {
 
  data() {
    return {
      newFertilizer: {
        fName: "",
        applicationMethod: "",
        unitPrice: 0,
        stockQuantity: 0,
        measurementUnit: "",
        description: "",
      },
    };
  },
  methods: {
    methods: {
   
    // async addFertilizer() {
    //   if (!this.isValidForm()) {
    //     return; // If form is not valid, do not proceed
    //   }

    //   try {
    //     const newFertilizer = {
    //       fName: this.fName,
    //       applicationMethod: this.applicationMethod,
    //       unitPrice: this.unitPrice,
    //       stockQuantity: this.stockQuantity,
    //       measurementUnit: this.measurementUnit,
    //       description: this.description,
    //     };

    //     const response = await fetch(
    //       "http://localhost:5154/api/Fertilizer/PostFertilizer",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newFertilizer),
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error(
    //         `Failed to add fertilizer. Status: ${response.status}`
    //       );
    //     }

    //     // Assuming you want to refresh the list of fertilizers after adding a new one
    //     //this.fetchFertilizers();

    //     // Clear input fields after successful addition
    //     this.clearForm();

    //     // Optionally, you can display a success message or perform any other action
    //     alert("Fertilizer added successfully!");
    //   } catch (error) {
    //     console.error("Error added fertilizer:", error);
    //     alert("Error adding fertilizer. Please try again.");
    //   }
    //   this.$emit("addFertilizer");
    // },
    cancel() {
      this.$emit('cancel');
    },
    isValidForm() {
      // Check if all required fields are filled
      return (
        this.fName &&
        this.applicationMethod &&
        this.unitPrice &&
        this.stockQuantity &&
        this.measurementUnit &&
        this.description
      );
    },
    clearForm() {
      // Clear input fields after successful addition
      this.fName = "";
      this.applicationMethod = "";
      this.unitPrice = 0;
      this.stockQuantity = 0;
      this.measurementUnit = "";
      this.description = "";
    },
  },
};
</script> -->

<script>
export default {
  data() {
    return {
      newFertilizer: {
        fName: "",
        applicationMethod: "",
        unitPrice: 0,
        stockQuantity: 0,
        measurementUnit: "",
        description: "",
      },
    };
  },
  methods: {
    addFertilizer() {
      console.log("Adding fertilizer...");
      // Perform validation if necessary
      // Example: check if all required fields are filled
      if (
        !this.fName ||
        !this.applicationMethod ||
        !this.unitPrice ||
        !this.stockQuantity ||
        !this.measurementUnit ||
        !this.description
      ) {
        this.error = "Please fill out all fields.";
        return;
      }

      // Create a new fertilizer object
      const newFertilizer = {
        fName: this.fName,
        applicationMethod: this.applicationMethod,
        unitPrice: this.unitPrice,
        stockQuantity: this.stockQuantity,
        measurementUnit: this.measurementUnit,
        description: this.description,
      };
      console.log("Adding fertilizer123..",newFertilizer);
      
      this.submitFormData();

      // Emit an event to pass the new fertilizer data to the parent component
      //this.$emit("addFertilizer", newFertilizer);

      // Reset the form after adding the fertilizer
      //this.clearForm();
    },
    async submitFormData() {
      try {
        const formData = {
          fName: this.fName,
          applicationMethod: this.applicationMethod,
          unitPrice: this.unitPrice,
          stockQuantity: this.stockQuantity,
          measurementUnit: this.measurementUnit,
          description: this.description,
        };
        //Connection
        const response = await fetch(
          "http://localhost:5154/api/Fertilizer/PostFertilizer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to add fertilizer. Status: ${response.status}`
          );
        }

        alert("fertilizer added successfully!");

        // Reset form fields after successful submission
        this.resetFormFields();
      } catch (error) {
        console.error("Error adding fertilizer:", error);

        alert("Error adding fertilizer. Please try again.");
      }
    },
    resetFormFields() {
      // Reset all form fields to empty strings
      this.fName = "";
      this.applicationMethod = "";
      this.unitPrice = "";
      this.stockQuantity = "";
      this.measurementUnit = "";
      this.description = "";
    },
    cancel() {
      this.$emit("cancel");
    },
    isValidForm() {
      // Check if all required fields are filled
      return (
        this.fName &&
        this.applicationMethod &&
        this.unitPrice &&
        this.stockQuantity &&
        this.measurementUnit &&
        this.description
      );
    },
    clearForm() {
      // Clear input fields after successful addition
      this.fName = "";
      this.applicationMethod = "";
      this.unitPrice = 0;
      this.stockQuantity = 0;
      this.measurementUnit = "";
      this.description = "";
    },
    navigateToView() {
      const router = this.$router;
      if (router) {
        router.push({ name: "fertilizerList" });
      } else {
        console.error("Router instance is undefined.");
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.frame .div-2 {
  background: linear-gradient(
    180deg,
    rgb(191.94, 240.12, 154.08) 0%,
    rgb(101.56, 155.13, 59.46) 100%
  );
  height: 695px;
  position: relative;
  width: 695px;
}
.form-label,
.form-check {
  text-align: left;
  display: block;
}
.form-container {
  padding: 20px;
}
.button-wrapper {
  display: inline-flex;
  justify-content: space-between;
}
.button-wrapper button {
  margin: 5px 30px; /* Adjust this value as needed */
}
</style>
