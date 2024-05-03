<template>
    <div class="frame">
      <div class="div-left">
        <div class="text-wrapper">ADD Product</div>
      </div>
      <div class="div-right">
        <div class="form-container">
            
            <!-- include all forms here -->

            <!-- this is sample -->
            <div class="mb-3">
                <label for="label-product-name" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="input-product-name" />
            </div>
      </div>
    </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: "addFertilizer",
    props: {
      msg: String,
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
  .frame .div-left {
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
  .frame .div-right {
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
  