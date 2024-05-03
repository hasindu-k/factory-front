<template>
  <div class="frame">
    <div class="div-wrapper">
      <div class="text-wrapper">Edit Fertilizer</div>
    </div>

    <form @submit.prevent="update">
      <div class="div-2">
        <div class="form-container">
          <div class="mb-3 mt-3">
            <label for="input-fertilizer-name" class="form-label">Fertilizer Name</label>
            <input type="text" class="form-control" id="input-fertilizer-name" v-model="editedFertilizer.fName" />
          </div>

          <div class="mb-3">
            <label class="form-label">Application Method</label>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="dry-apply"
                value="Dry apply"
                v-model="editedFertilizer.applicationMethod"
              />
              <label class="form-check-label" for="dry-apply">Dry apply</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                id="wet-apply"
                value="Wet apply"
                v-model="editedFertilizer.applicationMethod"
              />
              <label class="form-check-label" for="wet-apply">Wet apply</label>
            </div>
          </div>

          <div class="price-quantity">
            <div class="mb-3">
              <label for="input-price" class="form-label">Price</label>
              <input type="number" class="form-control" id="input-price" v-model="editedFertilizer.unitPrice" />
            </div>
            <div class="mb-3">
              <label for="input-quantity" class="form-label">Stock Quantity</label>
              <input type="number" class="form-control" id="input-quantity" v-model="editedFertilizer.stockQuantity" />
            </div>
          </div>

          <div class="mb-3">
            <label for="input-measurement-unit" class="form-label">Measurement Unit</label>
            <select class="form-select" id="input-measurement-unit" v-model="editedFertilizer.measurementUnit">
              <option selected>Choose...</option>
              <option value="Liter">Liter</option>
              <option value="Kilogram">Kilogram</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="input-fertilizer-desc" class="form-label">Fertilizer Description</label>
            <textarea class="form-control" id="input-fertilizer-desc" rows="4" v-model="editedFertilizer.description"></textarea>
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
    fertilizer: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editedFertilizer: { ...this.fertilizer },
    };
  },
  methods: {
    update() {
      this.$emit('update', this.editedFertilizer);
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
.form-label , .form-check {
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
