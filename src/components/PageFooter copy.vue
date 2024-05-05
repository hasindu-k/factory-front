<template>
  <footer class="footer-container">
    <!-- <div class="footer-column">
      
    </div> -->
    <div class="footer-column-main">
        <h3>URUWALA</h3>
        <h3>TEA FACTORY</h3>
        <p style="margin-top: 20px">
          Copyright © Uruwala Group PLC. All right reserved
        </p>
      </div>
    <div class="footer-column">
      <h3>Contact</h3>
      <div class="contact-container">
        <p>Phone: 041-2283654</p>
        <p>Email: uruwalatea@gmail.com</p>
      </div>
    </div>
    <div class="footer-column">
      <h3>Useful Links</h3>
      <ul>
        <div class="col-1">
          <li><a href="#">Home</a></li>
          <li><a href="#">Product</a></li>
          <li><a href="#">Service</a></li>
        </div>
        <div class="col-2">
          <li><a href="#">Cart</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </div>
      </ul>
    </div>
    <div class="footer-column">
      <h3>Follow Us</h3>
      <ul>
        <li><a href="https://www.facebook.com/uruwalatea?mibextid=ZbWKwL">Facebook</a></li>
        <li><a href="http://www.uruwala.lk/uruwalatea@gmail.com">Gmail</a></li>
        <li><a href="https://www.instagram.com/uruwala.tea?igshid=YmMyMTA2M2Y%3D">Instagram</a></li>
        
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  // Footer component logic
};
</script>
<style scoped>
.footer-container {
  background-color: #2a3925;
  color: #ffffff;
  padding: 10px;
  padding-bottom: 50px;
  display: flex;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
  margin-top: 5%;
}

.footer-column h3 {
  font-size: 1.2rem;
}

.footer-column ul {
  list-style-type: none;
  padding: 0;
}

.footer-column ul li {
  margin-bottom: 5px;
}

.footer-column ul li a {
  color: #ffffff;
  text-decoration: none;
}

.footer-contact-details {
  text-align: right;
}

.footer-contact-details p {
  margin: 5px 0;
}
.contact-container {
  margin-top: 20px;
  text-align: center;
}
.col-1,
.col-2 {
  display: inline-block;
  margin-right: 10px;
  padding-top: 15px;
}
.col-2 {
  margin-left: 40px;
}
.footer-column-main {
  flex: 1.5;
  margin-top: 5%;
}
</style>
