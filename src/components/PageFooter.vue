<template>
    <footer class="footer-container">
      <div class="footer-column">
        <h3>Contact</h3>
        <p>Phone: +123456789</p>
        <p>Email: example@example.com</p>
      </div>
      <div class="footer-column">
        <h3>Useful Links</h3>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Product</a></li>
          <li><a href="#">Service</a></li>
          <li><a href="#">Cart</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <!-- Empty column for alignment -->
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    // Footer component logic
  }
  </script>
<style scoped>
.footer-container {
  background-color: #343a40;
  color: #ffffff;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
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
</style>
  